import { BaseSyntheticEvent } from 'react';

import FormButton from '~/components/forms-fields/FormButton';
import FormLabel from '~/components/forms-fields/FormLabel';
import CheckIcon from '~/components/icons/CheckIcon';
import { RulesType } from '~/utils/form-validator';
import useAppForm from '~/hooks/useAppForm';

type Props = {
    defaultChecked?: boolean;
    label: string;
    rules?: RulesType | Array<keyof RulesType>;
};

export default function PrivyCheckbox({ defaultChecked, label, rules = [] }: Props) {
    const { error, getInputValue, labelId, updateInputValue } = useAppForm({
        label,
        rules,
        validateOnInit: false,
        value: defaultChecked ? 'checked' : '',
    });

    const updateValue = (e: BaseSyntheticEvent) => {
        e.target.value = getInputValue === 'checked' ? '' : 'checked';
        updateInputValue(e);
    };

    return (
        <div className='flex flex-row items-center'>
            {getInputValue !== 'checked' && (
                <FormButton checkbox onClick={updateValue}>
                    <CheckIcon className='dark:text-dm-primary h-4 w-4 text-white' />
                </FormButton>
            )}
            {getInputValue === 'checked' && (
                <FormButton checkbox onClick={updateValue} color='primary'>
                    <CheckIcon className='h-4 w-4' />
                </FormButton>
            )}
            <div className='ml-2'>
                <FormLabel error={error} labelId={labelId} label={label} />
            </div>
        </div>
    );
}
