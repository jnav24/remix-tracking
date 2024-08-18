import { useLocation, useNavigate } from '@remix-run/react';
import { cn } from '~/utils/helpers';
import { route } from '~/utils/routes';
import Typography from '~/components/elements/Typography';
import QueueListIcon from '~/components/icons/QueueListIcon';
import ClockIcon from '~/components/icons/ClockIcon';
import UserGroupIcon from '~/components/icons/UserGroupIcon';
import MoneyIcon from '~/components/icons/MoneyIcon';
import ContactIcon from '~/components/icons/ContactIcon';
import { Fragment } from 'react';

export default function SidebarNav() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const iconStyles = (custom = '') =>
        cn('size-6 text-lm-text-hover dark:text-dm-text-hover', custom);
    const navItems = [
        {
            label: 'Clients',
            notifications: 0,
            icon: <ContactIcon className={iconStyles()} />,
            to: route('dashboard.clients'),
            permission: '',
        },
        {
            label: 'Projects',
            notifications: 0,
            icon: <QueueListIcon className={iconStyles()} />,
            to: route('dashboard.projects'),
            permission: '',
        },
        {
            label: 'Time Tracker',
            notifications: 0,
            icon: <ClockIcon className={iconStyles()} />,
            to: route('dashboard.tasks'),
            permission: '',
        },
        {
            label: 'Billing',
            notifications: 0,
            icon: <MoneyIcon className={iconStyles()} />,
            to: route('dashboard.billing'),
            permission: '',
        },
        {
            label: 'Team',
            notifications: 0,
            icon: <UserGroupIcon className={iconStyles()} />,
            to: route('dashboard.team'),
            permission: '',
        },
    ];

    return (
        <>
            {navItems.map((item, idx) => (
                <Fragment key={idx}>
                    {item.permission === '' && (
                        <div
                            className={cn(
                                pathname === item.to &&
                                    'inline-block w-full rounded-lg bg-gradient-to-b from-lm-stroke/60 from-10% to-lm-stroke to-30% p-0.5 shadow-sm shadow-gray-300 dark:from-dm-stroke/60 dark:to-dm-secondary dark:shadow-black',
                                'group',
                            )}
                            key={idx}
                            onKeyDown={() => null}
                            onClick={() => navigate({ pathname: item.to })}
                            role='button'
                            tabIndex={0}
                        >
                            <div
                                className={cn(
                                    'flex items-center justify-between p-2 dark:bg-dm-secondary',
                                    pathname === item.to ? 'bg-lm-stroke' : 'bg-lm-secondary',
                                )}
                            >
                                <div className='flex items-center space-x-2'>
                                    {item.icon}
                                    <Typography
                                        className={cn(
                                            pathname !== item.to &&
                                                'group-hover:text-primary-focus dark:group-hover:text-primary',
                                        )}
                                        variant='caption'
                                    >
                                        {item.label}
                                    </Typography>
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
                </Fragment>
            ))}
        </>
    );
}
