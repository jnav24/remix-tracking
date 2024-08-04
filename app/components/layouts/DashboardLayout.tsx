import React from 'react';
import Typography from '~/components/elements/Typography';
import RadarIcon from '~/components/icons/RadarIcon';
import SidebarNav from '~/components/menu/SidebarNav';
import SidebarFooter from '~/components/menu/SidebarFooter';
import ProfileMenu from '~/components/menu/ProfileMenu';

type Props = {
    children: React.ReactNode;
    notifications?: number;
    title: string;
};

export default function DashboardLayout({ children, notifications, title }: Props) {
    return (
        <main className='flex h-screen bg-lm-primary dark:bg-dm-primary'>
            <aside className='relative w-64 border-r border-lm-stroke bg-white px-4 dark:border-dm-stroke dark:bg-dm-secondary'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2 py-4'>
                        <RadarIcon className='size-10 text-primary' />
                        <Typography className='text-xl' variant='body1'>
                            TrackR
                        </Typography>
                    </div>

                    <ProfileMenu />
                </div>

                <div className='mt-6 space-y-2'>
                    <SidebarNav />
                </div>

                <div className='absolute bottom-0 pb-4'>
                    <SidebarFooter />
                </div>
            </aside>

            <section className='flex-1'>
                <div className='flex items-center space-x-2 border-b border-lm-stroke bg-white px-10 py-4 dark:border-dm-stroke dark:bg-dm-primary'>
                    <Typography variant='body1'>{title}</Typography>
                    {!!notifications && (
                        <div className='rounded border border-lm-stroke bg-lm-primary px-2 py-1 dark:border-dm-stroke dark:bg-dm-secondary'>
                            <Typography variant='caption'>{notifications}</Typography>
                        </div>
                    )}
                </div>

                <div className='px-10 py-4'>{children}</div>
            </section>
        </main>
    );
}
