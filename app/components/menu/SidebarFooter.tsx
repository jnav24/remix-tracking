import Typography from '~/components/elements/Typography';
import LifeBuoyIcon from '~/components/icons/LifeBuoyIcon';
import ChatBubbleIcon from '~/components/icons/ChatBubbleIcon';

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
                        className='dark:text-dm-text-hover flex space-x-2'
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
