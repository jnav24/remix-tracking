import React, { BaseSyntheticEvent, forwardRef, Ref } from 'react';
import clsx from 'clsx';

import FormLabel from '~/components/forms-fields/FormLabel';
import useAppForm from '~/hooks/useAppForm';
import { RulesType } from '~/utils/form-validator';

type Props = {
    label: string;
    onBlur?: boolean;
    rules?: RulesType | Array<keyof RulesType>;
    defaultValue?: string;
    readOnly?: boolean;
    validateOnInit?: boolean;
    password?: boolean;
    noAutocomplete?: boolean;
    placeholder?: boolean;
    tall?: boolean;
    blended?: boolean;
    roundedFull?: boolean;
    icon?: React.ReactNode;
    inputProps?: Record<string, string>;
    name?: string;
};

function FormInput(
    {
        label,
        onBlur = true,
        rules,
        icon,
        name,
        defaultValue = '',
        readOnly = false,
        validateOnInit = false,
        password = false,
        noAutocomplete = false,
        placeholder = false,
        tall = false,
        blended = false,
        roundedFull = false,
        inputProps = {},
    }: Props,
    ref: Ref<HTMLInputElement>,
) {
    const { error, labelId, getInputValue, updateInputValue } = useAppForm({
        label,
        value: defaultValue,
        validateOnInit,
        rules,
        name,
    });

    const updateValue = (inputValue: BaseSyntheticEvent) => updateInputValue(inputValue);

    return (
        <div className='relative'>
            {!placeholder && <FormLabel error={error} labelId={labelId} label={label} />}
            <div className='relative mt-2'>
                {icon && (
                    <div className='absolute left-0 top-0 flex h-full w-10 flex-row items-center justify-center'>
                        {icon}
                    </div>
                )}
                <input
                    id={labelId}
                    name={labelId}
                    className={clsx(
                        'w-full rounded border pr-2 outline-none',
                        roundedFull ? 'rounded-full' : 'rounded',
                        tall ? 'pb-3 pt-4' : 'py-2',
                        icon ? 'pl-10' : roundedFull ? 'pl-4' : 'pl-2',
                        readOnly
                            ? 'bg-gray-200 text-gray-500 dark:bg-gray-700'
                            : blended
                              ? 'bg-transparent dark:text-gray-300'
                              : 'dark:bg-dm-primary bg-white text-gray-400',
                        !error
                            ? 'dark:border-dm-stroke border-gray-300 focus:border-primary'
                            : 'border-red-600',
                    )}
                    type={password ? 'password' : 'text'}
                    value={getInputValue}
                    autoComplete={noAutocomplete || password ? 'on' : 'off'}
                    aria-labelledby={labelId}
                    onBlur={(e) => {
                        if (onBlur) {
                            return updateValue(e);
                        }

                        return null;
                    }}
                    onChange={updateValue}
                    readOnly={readOnly}
                    placeholder={placeholder ? label : ''}
                    ref={ref}
                    {...inputProps}
                />
            </div>
            {error && <span className='absolute left-0 top-20 text-sm text-red-600'>{error}</span>}
        </div>
    );
}

export default forwardRef(FormInput);
