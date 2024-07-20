import { useLocation } from '@remix-run/react';
import { cn } from '~/utils/helpers';
import Typography from '~/components/elements/Typography';
import QueueListIcon from '~/components/icons/QueueListIcon';
import ClockIcon from '~/components/icons/ClockIcon';
import UserGroupIcon from '~/components/icons/UserGroupIcon';
import MoneyIcon from '~/components/icons/MoneyIcon';
import ContactIcon from '~/components/icons/ContactIcon';

export default function SidebarNav() {
    const { pathname } = useLocation();
    const iconStyles = (custom = '') => cn('size-6 dark:text-dm-text-hover', custom);
    const navItems = [
        {
            label: 'Clients',
            notifications: 0,
            icon: <ContactIcon className={iconStyles()} />,
            to: '',
            permission: '',
        },
        {
            label: 'Projects',
            notifications: 0,
            icon: <QueueListIcon className={iconStyles()} />,
            to: '',
            permission: '',
        },
        {
            label: 'Time Tracker',
            notifications: 0,
            icon: <ClockIcon className={iconStyles()} />,
            to: '/dashboard/tasks',
            permission: '',
        },
        {
            label: 'Billing',
            notifications: 0,
            icon: <MoneyIcon className={iconStyles()} />,
            to: '',
            permission: '',
        },
        {
            label: 'Team',
            notifications: 0,
            icon: <UserGroupIcon className={iconStyles()} />,
            to: '',
            permission: '',
        },
    ];

    return (
        <>
            {navItems.map((item, idx) => (
                <>
                    {item.permission === '' && (
                        <div
                            className={cn(
                                pathname === item.to &&
                                    'to-dm-secondary from-dm-stroke/60 inline-block w-full rounded-lg bg-gradient-to-b from-10% to-30% p-0.5 shadow-sm shadow-black',
                            )}
                            key={idx}
                        >
                            <div className='bg-dm-secondary flex items-center justify-between p-2'>
                                <div className='flex items-center space-x-2'>
                                    {item.icon}
                                    <Typography variant='caption'>{item.label}</Typography>
                                </div>

                                {item.notifications > 0 && (
                                    <div>
                                        <Typography variant='caption'>
                                            {item.notifications}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            ))}
        </>
    );
}
