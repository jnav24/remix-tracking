import { BaseSyntheticEvent, useContext, useEffect, useMemo, useState } from 'react';
import { FormContext } from '~/providers/FormContextProvider';
import { RulesType } from '~/utils/form-validator';

type Props = {
    label: string;
    name?: string;
    rules?: RulesType | Array<keyof RulesType>;
    validateOnInit: boolean;
    value: string;
};

export default function useAppForm({ label, rules, validateOnInit, value, name }: Props) {
    const formContext = useContext(FormContext);
    const [labelId, setLabelId] = useState('');

    const error = useMemo(() => {
        if (formContext && Object.keys(formContext).length && formContext.formElements[labelId]) {
            return formContext.formElements[labelId].error;
        }

        return null;
    }, [formContext]);

    useEffect(() => {
        if (label && !!formContext && Object.keys(formContext).length && rules) {
            setLabelId(formContext.setupForm(name ?? label, rules));
        }
    }, []);

    useEffect(() => {
        if (labelId.length) {
            formContext.validateField(labelId, value, validateOnInit);
        }
    }, [labelId, value]);

    const updateInputValue = (inputValue: BaseSyntheticEvent) => {
        if (formContext && !!Object.keys(formContext).length) {
            formContext.validateField(labelId, inputValue.target.value, true);
        }
    };

    return { error, labelId, updateInputValue };
}
