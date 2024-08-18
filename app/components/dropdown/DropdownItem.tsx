import { useEffect, useRef } from 'react';
import { cn } from '~/utils/helpers';
import Typography from '~/components/elements/Typography';
import { Item } from '~/components/dropdown/Dropdown';

type Props = {
    items: Array<Item>;
    show: boolean;
};

export default function DropdownItem({ items, show }: Props) {
    const subNav = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let timeoutId: undefined | NodeJS.Timeout;

        if (!show) {
            timeoutId = setTimeout(() => {
                (subNav.current as HTMLDivElement).classList.add('h-0', 'py-0');
            }, 400);
        } else {
            (subNav.current as HTMLDivElement).classList.remove('h-auto', 'py-1');
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [show]);

    return (
        <div
            className={cn(
                'absolute right-0 w-auto overflow-hidden rounded-lg bg-white shadow-lg transition delay-100 duration-300 ease-out',
                show ? 'translate-y-2 opacity-100' : 'translate-y-16 opacity-0',
            )}
            ref={subNav}
        >
            {items.map((item, index) => (
                <button
                    className='flex min-w-32 cursor-pointer flex-row items-center justify-start px-2 py-3 text-sm text-gray-600 hover:bg-gray-200'
                    key={index}
                    onClick={item.action}
                    type='button'
                >
                    {item.icon}
                    <Typography className='ml-2' variant='caption'>
                        {item.label}
                    </Typography>
                </button>
            ))}
        </div>
    );
}
