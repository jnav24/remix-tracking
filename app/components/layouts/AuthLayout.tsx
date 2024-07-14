import React from 'react';

type Props = {
    children: React.ReactNode;
    title: string;
};

export default function AuthLayout({ children, title }: Props) {
    return (
        <main className='flex min-h-screen flex-col justify-center bg-gray-50 py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='flex justify-center'>logo</div>

                <h2 className='mt-6 text-center text-3xl font-light leading-9 text-gray-700'>
                    {title}
                </h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>{children}</div>
            </div>
        </main>
    );
}
