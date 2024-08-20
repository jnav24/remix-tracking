import React from 'react';
import RadarIcon from '~/components/icons/outline/RadarIcon';
import Typography from '~/components/elements/Typography';

type Props = {
    children: React.ReactNode;
    title: string;
};

export default function AuthLayout({ children, title }: Props) {
    return (
        <main className='flex min-h-screen flex-col justify-center bg-lm-primary py-12 dark:bg-dm-primary sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='flex justify-center'>
                    <RadarIcon className='size-16 text-primary' />
                </div>

                <Typography className='mt-6 text-center' variant='h2'>
                    {title}
                </Typography>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white px-4 py-8 shadow dark:bg-dm-secondary sm:rounded-lg sm:px-10'>
                    {children}
                </div>
            </div>
        </main>
    );
}
