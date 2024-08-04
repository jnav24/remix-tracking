import Avatar from '~/components/elements/Avatar';
import ChevronDownIcon from '~/components/icons/ChevronDownIcon';
import Typography from '~/components/elements/Typography';
import UserIcon from '~/components/icons/outline/UserIcon';
import CogIcon from '~/components/icons/outline/CogIcon';
import FormButton from '~/components/forms-fields/FormButton';
import LogoutIcon from '~/components/icons/outline/LogoutIcon';

export default function ProfileMenu() {
    const iconStyles = 'size-6 dark:text-dm-text-hover';

    const links = [
        { label: 'My Profile', icon: <UserIcon className={iconStyles} />, to: '' },
        { label: 'Account Settings', icon: <CogIcon className={iconStyles} />, to: '' },
    ];

    return (
        <div className='relative flex items-center space-x-2 rounded-full py-1 pl-1 pr-2 dark:bg-dm-stroke'>
            <Avatar
                image='https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                size={8}
            />
            <ChevronDownIcon className='size-4 dark:text-gray-500' />

            <div className='absolute -left-2 top-12 w-56 rounded-lg border bg-lm-secondary shadow-xl dark:border-dm-stroke dark:bg-dm-secondary'>
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
                            key={idx}
                        >
                            {item.icon}
                            <Typography variant='caption'>{item.label}</Typography>
                        </div>
                    ))}
                </div>
                <div className='p-2'>
                    <FormButton block filled>
                        <div className='flex items-center space-x-2'>
                            <LogoutIcon className='size-4 text-white' />
                            <span>Logout</span>
                        </div>
                    </FormButton>
                </div>
            </div>
        </div>
    );
}
