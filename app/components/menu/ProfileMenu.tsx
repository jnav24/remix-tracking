import Avatar from '~/components/elements/Avatar';
import ChevronDownIcon from '~/components/icons/ChevronDownIcon';
import Typography from '~/components/elements/Typography';
import UserIcon from '~/components/icons/outline/UserIcon';
import CogIcon from '~/components/icons/outline/CogIcon';
import FormButton from '~/components/forms-fields/FormButton';
import LogoutIcon from '~/components/icons/outline/LogoutIcon';
import { useNavigate } from '@remix-run/react';
import { route } from '~/utils/routes';
import { useEffect, useRef, useState } from 'react';
import { cn } from '~/utils/helpers';

export default function ProfileMenu() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        menuRef.current?.classList.add('h-0', 'py-0');
    }, []);

    useEffect(() => {
        let timeoutId: undefined | NodeJS.Timeout;
        const { current } = menuRef;

        const clickHandler = (e: MouseEvent) => {
            const container = document.getElementById('subnav');

            if (!container || !container.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (!isOpen && current) {
            timeoutId = setTimeout(() => {
                current.classList.add('h-0', 'py-0');
            }, 300);
            document.removeEventListener('click', clickHandler);
        } else if (current) {
            current.classList.remove('h-auto', 'py-1');
            document.addEventListener('click', clickHandler);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            document.removeEventListener('click', clickHandler);
        };
    }, [isOpen, menuRef]);

    const iconStyles = 'size-6 dark:text-dm-text-hover';

    const links = [
        {
            label: 'My Profile',
            icon: <UserIcon className={iconStyles} />,
            to: route('dashboard.billing'),
        },
        {
            label: 'Account Settings',
            icon: <CogIcon className={iconStyles} />,
            to: route('dashboard.projects'),
        },
    ];

    return (
        <section className='relative'>
            <button
                className='flex items-center space-x-2 rounded-full py-1 pl-1 pr-2 dark:bg-dm-stroke'
                onClick={() => setIsOpen(!isOpen)}
                type='button'
            >
                <Avatar
                    image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                    size={8}
                />
                <ChevronDownIcon
                    className={cn(
                        'size-4 transition duration-300 dark:text-gray-500',
                        isOpen ? 'rotate-180' : 'rotate-0',
                    )}
                />
            </button>

            <div
                id='subnav'
                className={cn(
                    'absolute -left-2 top-12 w-56 overflow-hidden rounded-lg border bg-lm-secondary shadow-xl transition duration-300 ease-out dark:border-dm-stroke dark:bg-dm-secondary',
                    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                ref={menuRef}
            >
                <div className='flex items-center space-x-2 py-2 pl-2'>
                    <Avatar
                        image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                        size={8}
                    />
                    <div>
                        <Typography variant='body1'>Peter Parker</Typography>
                        <Typography variant='caption'>pparker@gmail.com</Typography>
                    </div>
                </div>
                <div className='space-y-2 border-b-2 border-t-2 p-2 dark:border-dm-stroke'>
                    {links.map((item, idx) => (
                        <div
                            className='flex cursor-pointer items-center space-x-2 rounded-lg p-1 dark:hover:bg-dm-stroke'
                            onClick={() => navigate(item.to)}
                            onKeyDown={() => null}
                            role='button'
                            key={idx}
                            tabIndex={0}
                        >
                            {item.icon}
                            <Typography variant='caption'>{item.label}</Typography>
                        </div>
                    ))}
                </div>
                <div className='p-2'>
                    <form action={route('dashboard.logout')} method='POST'>
                        <FormButton block filled submit>
                            <div className='flex items-center space-x-2'>
                                <LogoutIcon className='size-4 text-white' />
                                <span>Logout</span>
                            </div>
                        </FormButton>
                    </form>
                </div>
            </div>
        </section>
    );
}
