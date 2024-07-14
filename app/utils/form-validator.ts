import { toTitleCase } from '~/utils/helpers';
// import { ValidationExceptionServer } from '~/utils/validation-exception.server';

class TrackingError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateRequired(val: string | number): boolean {
    return !!val.toString().trim();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateUpper(value: string): boolean {
    return /[A-Z]/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateLower(value: string): boolean {
    return /[a-z]/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateAlphaNumeric(value: string): boolean {
    return /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateSpecialCharacters(value: string): boolean {
    return /[!@#$%^&*)(+=._-]+/g.test(value);
}

/**
 *
 * @param matchingValue; has the form rule `match`
 * @param value; regular form rule that `matchingValue` is getting matched to
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateMatch(matchingValue: string, value: string): boolean {
    if (value.includes('|')) {
        return matchingValue === value.split('|')[1];
    }

    return matchingValue === value;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateNumeric(value: string): boolean {
    return /^\d+$/.test(value);
}

export function validateHasInt(value: string): boolean {
    return /[0-9]+/g.test(value);
}

function validateFunctionParam(fun: string, num: string) {
    if (!validateNumeric(num)) {
        throw new TrackingError(`The param for the validation rule, ${fun}, must be numeric`);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateMax(value: string, characters: string) {
    validateFunctionParam('max', characters);
    return value.length <= Number(characters);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateMin(value: string, characters: string) {
    validateFunctionParam('min', characters);
    return value.length >= Number(characters);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateFloat(value: string, num: string) {
    validateFunctionParam('float', num);
    const regex = '^\\d+(\\.\\d{' + num + '})$';
    return new RegExp(regex).test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateGt(value: string, num: string) {
    validateFunctionParam('gt', num);
    return Number(value) > Number(num);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateEq(value: string, num: string) {
    validateFunctionParam('eq', num);
    return value.length === Number(num);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validatePhone(value: string) {
    const regex = '^\\+(\\d{11})$';
    return new RegExp(regex).test(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateIn(value: string, list: string) {
    return list.split(',').includes(value);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function validateUuid(value: string) {
    const regex = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$';
    return new RegExp(regex, 'i').test(value);
}

export type RulesOptions = {
    message?: string;
    pattern?: string;
};

export type RulesType = {
    'alpha-numeric'?: RulesOptions;
    email?: RulesOptions;
    [key: `eq:${number}`]: RulesOptions;
    float?: RulesOptions;
    [key: `gt:${number}`]: RulesOptions;
    'has-int'?: RulesOptions;
    lower?: RulesOptions;
    [key: `match:${string}`]: RulesOptions;
    [key: `max:${number}`]: RulesOptions;
    [key: `min:${number}`]: RulesOptions;
    numeric?: RulesOptions;
    phone?: RulesOptions;
    required?: RulesOptions;
    upper?: RulesOptions;
    [key: `in:${string}`]: RulesOptions;
    uuid?: RulesOptions;
};

const defaultErrorMessages: Record<string, string> = {
    required: 'Field is required',
    email: 'Must be a valid email address',
    max: 'Field can not exceed ##REPLACE## characters',
    min: 'Field should be ##REPLACE## or more characters',
    eq: 'Field should be ##REPLACE## characters',
    'alpha-numeric': 'Field must contain letters and numbers',
    upper: 'Field must contain an uppercase letter',
    lower: 'Field must contain a lowercase letter',
    match: 'Field must match with `##REPLACE##`',
    numeric: 'Field can only contain numbers',
    float: 'Field must be numeric with ##REPLACE## decimals',
    gt: 'Field must be greater than ##REPLACE##',
    'has-int': 'Field must contain a number',
    phone: 'Field must be a valid phone number',
    in: 'Field must contain one of the following: `##REPLACE##`',
    uuid: 'Field must be a valid UUID',
};

const setMessage = (message: string | RulesOptions, rep: string) => {
    if (!message) {
        return defaultErrorMessages.required;
    }

    if (typeof message !== 'string') {
        message = message.message ?? defaultErrorMessages.required;
    }

    if (rep.includes('|')) {
        return message.replace('##REPLACE##', rep.split('|')[0]);
    }

    return message.replace('##REPLACE##', rep);
};

const getTypeAndParam = (type: string): string[] => type.split(':');

const validateInput = (type: string, value: string): boolean => {
    const [validationType, validationParam] = getTypeAndParam(type);
    const func: any = `validate${toTitleCase(validationType).replace(/\s+/, '')}`;

    try {
        return validationParam ? eval(func)(value, validationParam) : eval(func)(value);
    } catch (err) {
        if (err instanceof TrackingError) {
            throw err.message;
        }

        throw `Function for type '${validationType}', does not exist`;
    }
};

const validateRules = (
    inputValue: string,
    rules: RulesType | Array<keyof RulesType>,
): { error: null | string; valid: boolean } => {
    let tempValid = true;
    let error = null;

    if (
        !Object.values(rules).includes('required') &&
        !Object.keys(rules).includes('required') &&
        (!inputValue || !inputValue.toString().trim().length)
    ) {
        return { error, valid: tempValid };
    }

    for (const [key, value] of Object.entries(rules)) {
        const isNumeric = validateNumeric(key);
        const type = isNumeric ? value : key;
        const [validationType, validationParams] = getTypeAndParam(type);

        const message = setMessage(
            isNumeric ? defaultErrorMessages[validationType] : value,
            validationParams ?? '',
        );

        const isValid = validateInput(type, inputValue);

        if (!tempValid) {
            continue;
        }

        if (!isValid && tempValid) {
            error = message;
            tempValid = false;
            continue;
        }

        error = null;
        tempValid = true;
    }

    return {
        error,
        valid: tempValid,
    };
};

// const validateRequest = <InputObject, RuleObject extends keyof InputObject>(
//     request: InputObject,
//     rulesObject: Record<RuleObject, Array<keyof RulesType> | RulesType>,
// ) => {
//     const errors = {} as Record<RuleObject, string>;
//
//     (Object.keys(rulesObject) as RuleObject[]).forEach((field) => {
//         const { error, valid } = validateRules(
//             (request?.[field] ?? '') as string,
//             rulesObject[field],
//         );
//         if (!valid) {
//             errors[field] = error as string;
//         }
//     });
//
//     if (Object.keys(errors).length) {
//         throw new ValidationExceptionServer('Validation error', errors);
//     }
// };

export { validateInput, validateRules };
