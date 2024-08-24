import UserIcon from '~/components/icons/solid/UserIcon';
import { cn } from '~/utils/helpers';

type Props = {
    image?: string;
    size?: number;
};

export default function Avatar({ image, size = 8 }: Props) {
    const sizes: Record<number, string> = {
        6: 'size-6',
        7: 'size-7',
        8: 'size-8',
        9: 'size-9',
        10: 'size-10',
        11: 'size-11',
        12: 'size-12',
        14: 'size-14',
        16: 'size-16',
        20: 'size-20',
        24: 'size-24',
        28: 'size-28',
        32: 'size-32',
        36: 'size-36',
    };

    return (
        <>
            <div
                className={cn(
                    'flex size-28 flex-row items-center justify-center overflow-hidden rounded-full bg-gray-300 object-cover transition duration-150 ease-out hover:shadow-xl dark:bg-gray-700',
                    `${sizes[size] ?? 'size-6'}`,
                )}
            >
                {image && <img src={image} alt='' className='min-h-full object-cover' />}
                {!image && <UserIcon className='h-2/4 w-2/4 text-gray-600 dark:text-gray-300' />}
            </div>
        </>
    );
}
