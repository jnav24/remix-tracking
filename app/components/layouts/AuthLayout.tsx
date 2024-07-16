import React from 'react';
import RadarIcon from '~/components/icons/RadarIcon';
import Typography from '~/components/elements/Typography';

type Props = {
    children: React.ReactNode;
    title: string;
};

export default function AuthLayout({ children, title }: Props) {
    return (
        <main className='dark:bg-dm-primary bg-lm-primary flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='flex justify-center'>
                    <RadarIcon className='size-16 text-primary' />
                </div>

                <Typography className='mt-6 text-center' variant='h2'>
                    {title}
                </Typography>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='dark:bg-dm-secondary bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
                    {children}
                </div>
            </div>
        </main>
    );
}
