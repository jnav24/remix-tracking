import { ReactNode } from 'react';
import Typography from '~/components/elements/Typography';
import FormButton from '~/components/forms-fields/FormButton';

export type Props = {
    button?: {
        label: string | ReactNode;
        onClick: () => null | void;
    };
    content?: string;
    title?: string;
};

export default function TableEmpty({
    button,
    title = 'No Results',
    content = 'Could not find any matching results. Please try again',
}: Props) {
    return (
        <section className='flex w-full flex-col items-center rounded-lg border border-lm-stroke bg-lm-secondary py-20 dark:border-dm-stroke dark:bg-dm-secondary'>
            <div className='w-72 space-y-4 text-center'>
                <Typography variant='h2'>{title}</Typography>
                <Typography variant='body1'>
                    <span className='text-gray-500 dark:text-gray-400'>{content}</span>
                </Typography>
                {button && (
                    <FormButton color='inverse' size='xs' onClick={button.onClick}>
                        {button.label}
                    </FormButton>
                )}
            </div>
        </section>
    );
}
