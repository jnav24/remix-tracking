import React from 'react';
import Typography from '~/components/elements/Typography';
import RadarIcon from '~/components/icons/RadarIcon';
import Avatar from '~/components/elements/Avatar';
import ChevronDownIcon from '../icons/ChevronDownIcon';
import SidebarNav from '~/components/menu/SidebarNav';
import SidebarFooter from '~/components/menu/SidebarFooter';

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

                    <div className='dark:bg-dm-stroke flex items-center space-x-2 rounded-full py-1 pl-1 pr-2'>
                        <Avatar
                            image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                            size={8}
                        />
                        <ChevronDownIcon className='size-4 dark:text-gray-500' />
                    </div>
                </div>

                <div className='mt-6 space-y-2'>
                    <SidebarNav />
                </div>

                <div className='absolute bottom-0 pb-4'>
                    <SidebarFooter />
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
