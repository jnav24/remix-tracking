import React from 'react';
import Typography from '~/components/elements/Typography';
import RadarIcon from '~/components/icons/RadarIcon';
import QueueListIcon from '~/components/icons/QueueListIcon';
import ClockIcon from '~/components/icons/ClockIcon';

type Props = {
    children: React.ReactNode;
    notifications?: number;
    title: string;
};

export default function DashboardLayout({ children, notifications, title }: Props) {
    return (
        <main className='dark:bg-dm-primary bg-lm-primary flex h-screen'>
            <aside className='dark:bg-dm-secondary dark:border-dm-stroke border-lm-stroke relative w-64 border-r bg-white px-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2 py-4'>
                        <RadarIcon className='size-10 text-primary' />
                        <Typography className='text-xl' variant='body1'>
                            TrackR
                        </Typography>
                    </div>

                    <div>profile</div>
                </div>

                <div className='mt-6 space-y-2'>
                    <div className='to-dm-secondary from-dm-stroke/60 inline-block w-full rounded-lg bg-gradient-to-b from-10% to-30% p-1 shadow shadow-black'>
                        <div className='bg-dm-secondary flex items-center space-x-2 p-2'>
                            <QueueListIcon className='size-6 text-gray-500' />
                            <Typography variant='caption'>Projects</Typography>
                        </div>
                    </div>
                    <div className=''>
                        <div className='bg-dm-secondary flex items-center space-x-2 p-2'>
                            <ClockIcon className='size-6 text-gray-500' />
                            <Typography variant='caption'>Billing Tracker</Typography>
                        </div>
                    </div>
                </div>

                <div className='absolute bottom-0 pb-4'>
                    <Typography variant='caption'>Support &amp; FAQ</Typography>
                    <Typography variant='caption'>Request Feature</Typography>
                    <Typography variant='caption'>
                        &copy; {new Date().getFullYear()} TrackR
                    </Typography>
                </div>
            </aside>

            <section className='flex-1'>
                <div className='border-lm-stroke dark:border-dm-stroke dark:bg-dm-primary flex items-center space-x-2 border-b bg-white px-10 py-4'>
                    <Typography variant='body1'>{title}</Typography>
                    {!!notifications && (
                        <div className='dark:bg-dm-secondary dark:border-dm-stroke bg-lm-primary border-lm-stroke rounded border px-2 py-1'>
                            <Typography variant='caption'>{notifications}</Typography>
                        </div>
                    )}
                </div>

                <div className='px-10 py-4'>{children}</div>
            </section>
        </main>
    );
}
