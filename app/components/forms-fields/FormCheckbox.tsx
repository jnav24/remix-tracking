import { BaseSyntheticEvent } from 'react';

import FormButton from '~/components/forms-fields/FormButton';
import FormLabel from '~/components/forms-fields/FormLabel';
import CheckIcon from '~/components/icons/outline/CheckIcon';
import { RulesType } from '~/utils/form-validator';
import useAppForm from '~/hooks/useAppForm';

type Props = {
    defaultChecked?: boolean;
    handleUpdateInput?: (v: boolean) => void;
    label: string;
    rules?: RulesType | Array<keyof RulesType>;
};

export default function PrivyCheckbox({
    defaultChecked,
    handleUpdateInput,
    label,
    rules = [],
}: Props) {
    const { error, getInputValue, labelId, updateInputValue } = useAppForm({
        label,
        rules,
        validateOnInit: false,
        value: defaultChecked ? 'checked' : '',
    });

    const updateValue = (e: BaseSyntheticEvent) => {
        e.target.value = getInputValue === 'checked' ? '' : 'checked';
        updateInputValue(e);
        handleUpdateInput?.(getInputValue === 'checked');
    };

    return (
        <div className='flex flex-row items-center'>
            {getInputValue !== 'checked' && (
                <FormButton checkbox onClick={updateValue}>
                    <CheckIcon className='h-4 w-4 text-lm-secondary dark:text-dm-primary' />
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
