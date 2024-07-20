import UserIcon from '~/components/icons/UserIcon';
import { cn } from '~/utils/helpers';

type Props = {
    image?: string;
    size?: number;
};

export default function Avatar({ image, size = 8 }: Props) {
    return (
        <>
            <div
                className={cn(
                    'flex flex-row items-center justify-center overflow-hidden rounded-full bg-gray-300 object-cover transition duration-150 ease-out hover:shadow-xl dark:bg-gray-700',
                    `size-${size < 6 ? 6 : size}`,
                )}
            >
                {image && <img src={image} alt='' className='min-h-full object-cover' />}
                {!image && <UserIcon className='h-2/4 w-2/4 text-gray-600 dark:text-gray-300' />}
            </div>
        </>
    );
}
