import React, { createContext, BaseSyntheticEvent, useEffect, useReducer, useState } from 'react';
import { RulesType, validateRules } from '~/utils/form-validator';
import { useFetcher } from '@remix-run/react';
import { encryptWithAES } from '~/utils/encryption';

enum FormElement {
    ADD_FORM_ELEMENT = 'ADD_FORM_ELEMENT',
    UPDATE_FORM_ELEMENT = 'UPDATE_FORM_ELEMENT',
}

type FormElementValidationType = {
    valid: boolean;
    rules: RulesType | Array<keyof RulesType>;
    error: string | null;
    value: string;
};

type FormElementsType = Record<string, FormElementValidationType>;

type FormContextType = {
    formElements: FormElementsType;
    setupForm: (label: string, rules: RulesType | Array<keyof RulesType>) => string;
    validateField: (labelId: string, value: string, initialize?: boolean) => string | null;
    validateAllFields: () => void;
};

type FormContextProviderProps = {
    children: React.ReactNode;
    handleSubmit?: (e: BaseSyntheticEvent) => void;
    isSensitive?: boolean;
};

type FormElementAction =
    | { type: FormElement.ADD_FORM_ELEMENT; payload: FormElementsType }
    | {
          type: FormElement.UPDATE_FORM_ELEMENT;
          payload: Record<
              string,
              Partial<
                  Record<
                      keyof FormElementValidationType,
                      boolean | string | null | Record<string, string>
                  >
              >
          >;
      };

export const FormContext = createContext({} as FormContextType);
const initialState = {} as FormElementsType;

function reducer(state: FormElementsType, action: FormElementAction): FormElementsType {
    switch (action.type) {
        case FormElement.ADD_FORM_ELEMENT:
            return {
                ...state,
                ...action.payload,
            };
        case FormElement.UPDATE_FORM_ELEMENT: {
            const [[key, value]] = Object.entries(action.payload);

            if (!state[key]) {
                return state;
            }

            return {
                ...state,
                [key]: {
                    ...state[key],
                    ...value,
                },
            } as FormElementsType;
        }
        default:
            return state;
    }
}

const FormContextProvider = ({ children, handleSubmit, isSensitive }: FormContextProviderProps) => {
    let matchFields: Record<string, string> = {};
    const [formElements, dispatch] = useReducer(reducer, initialState);
    const [isValid, setIsValid] = useState(false);
    const fetcher = useFetcher();

    const setFormElement = (
        name: string,
        rules: RulesType | Array<keyof RulesType>,
        value = '',
    ): void => {
        dispatch({
            type: FormElement.ADD_FORM_ELEMENT,
            payload: {
                [name]: {
                    rules,
                    valid: !Object.keys(rules).length,
                    error: null,
                    value,
                },
            },
        });
    };

    const setFormId = (name: string): string => name.toLowerCase().replace(/\s+/g, '-');

    const getMatchId = (rules: RulesType | Array<keyof RulesType>) => {
        let matchId: string | null = null;

        const keys = Object.keys(rules).filter((str) => str.includes('match'));
        const values = Object.values(rules).filter((str) => str.includes('match'));

        if (keys.length && keys[0].includes(':')) {
            matchId = keys[0].split(':')[1];
        }

        if (values.length && values[0].includes(':')) {
            matchId = values[0].split(':')[1];
        }

        return matchId;
    };

    const setMatchFields = (labelId: string, rules: RulesType | Array<keyof RulesType>) => {
        const result: Record<string, string> = {};
        const matchId = getMatchId(rules);

        if (matchId) {
            result[matchId] = labelId;
        }

        return result;
    };

    const setupForm = (label: string, rules: RulesType | Array<keyof RulesType> = {}) => {
        const labelId = setFormId(label);
        setFormElement(labelId, rules);
        matchFields = {
            ...matchFields,
            ...setMatchFields(labelId, rules),
        };
        return labelId;
    };

    const isFormValid = () => {
        const keys = Object.keys(formElements);
        const valid = Object.values(formElements).filter(
            (elem: { valid: boolean; rules: RulesType | Array<keyof RulesType> }) => elem.valid,
        );
        setIsValid(keys.length === valid.length);
    };

    useEffect(() => {
        isFormValid();
    }, [formElements]);

    const setMatchRules = (rules: RulesType | (keyof RulesType)[]) => {
        const valuesIndex = Object.values(rules).findIndex((rule) => rule.includes('match'));

        const matchKey = Object.keys(rules).filter((str) =>
            str.includes('match'),
        ) as (keyof RulesType)[];

        if (matchKey.length) {
            const result: RulesType = { ...rules };
            const formName = matchKey[0].split(':')[1];
            delete result[matchKey[0]];
            return {
                ...result,
                [`match:${formName}|${formElements[formName].value}`]: (rules as RulesType)[
                    matchKey[0]
                ],
            };
        }

        if (valuesIndex > -1) {
            const result = { ...rules };
            const formName = (result as Array<keyof RulesType>)[valuesIndex].split(':')[1];
            (result as Array<keyof RulesType>)[valuesIndex] =
                `match:${formName}|${formElements[formName].value}`;
            return result;
        }

        return rules;
    };

    const validateField = (labelId: string, value: string, initialize = false): string | null => {
        if (!labelId || !labelId.length || !formElements[labelId]) {
            return null;
        }

        const { rules } = formElements[labelId];
        const { error, valid } = validateRules(value, setMatchRules(rules));
        dispatch({
            type: FormElement.UPDATE_FORM_ELEMENT,
            payload: {
                [labelId]: {
                    valid,
                    value,
                },
            },
        });

        if (initialize) {
            dispatch({
                type: FormElement.UPDATE_FORM_ELEMENT,
                payload: {
                    [labelId]: {
                        error,
                    },
                },
            });
        }

        if (matchFields[labelId] && formElements[matchFields[labelId]]) {
            validateField(matchFields[labelId], formElements[matchFields[labelId]].value);
        }

        return error;
    };

    const validateAllFields = () => {
        for (const [key, obj] of Object.entries(formElements)) {
            validateField(key, obj.value, true);
        }
    };

    const prepareSensitiveData = () => {
        const formData = new FormData();

        const data = Object.entries(formElements).reduce(
            (result, [key, obj]) => {
                return {
                    ...result,
                    [key]: obj.value,
                };
            },
            {} as Record<string, string>,
        );

        formData.append('data', encryptWithAES(JSON.stringify(data)));

        return formData;
    };

    const validateSubmit = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        if (isValid) {
            if (handleSubmit instanceof Function) {
                return handleSubmit(e);
            }

            const formData = isSensitive ? prepareSensitiveData() : e.currentTarget;
            return fetcher.submit(formData, { method: 'POST' });
        }

        return validateAllFields();
    };

    return (
        <FormContext.Provider
            value={{
                validateField,
                setupForm,
                formElements,
                validateAllFields,
            }}
        >
            <form method='POST' onSubmit={validateSubmit}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

export default FormContextProvider;
