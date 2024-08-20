import Typography from '~/components/elements/Typography';
import LifeBuoyIcon from '~/components/icons/outline/LifeBuoyIcon';
import ChatBubbleIcon from '~/components/icons/outline/ChatBubbleIcon';

export default function SidebarFooter() {
    const navLinks = [
        { label: 'Support & FAQ', icon: <LifeBuoyIcon className='size-6' /> },
        { label: 'Request Feature', icon: <ChatBubbleIcon className='size-6' /> },
    ];

    return (
        <>
            <div className='mb-10 space-y-4'>
                {navLinks.map((item, idx) => (
                    <Typography
                        className='flex space-x-2 dark:text-dm-text-hover'
                        variant='caption'
                        key={idx}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </Typography>
                ))}
            </div>

            <Typography className='dark:text-dm-text' variant='caption'>
                &copy; {new Date().getFullYear()} TrackR
            </Typography>
        </>
    );
}
