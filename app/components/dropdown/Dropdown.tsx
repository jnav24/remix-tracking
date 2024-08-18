import { ReactNode, useState } from 'react';
import { cn } from '~/utils/helpers';
import DropdownItem from '~/components/dropdown/DropdownItem';

export type Item = {
    icon?: ReactNode;
    label: string;
    action?: () => void;
};

type Props = {
    children: ReactNode;
    disabled?: boolean;
    label?: string;
    items: Array<Item>;
};

export default function Dropdown({ children, disabled, label = 'Dropdown Menu', items }: Props) {
    const [showSubNav, setShowSubNav] = useState(false);

    return (
        <div className='relative'>
            <button
                aria-haspopup='true'
                aria-label={label}
                className={cn(
                    disabled && 'bg-gray-200 text-gray-400',
                    !disabled &&
                        'dark:bg-dark-main dark:hover:bg-dark-secondary bg-white text-gray-600 hover:bg-gray-100 active:bg-gray-200 dark:text-gray-300',
                    'ease flex rounded-full border-2 p-2 text-sm transition duration-300 focus:outline-none',
                )}
                disabled={disabled}
                onBlur={() => setShowSubNav(false)}
                onClick={() => setShowSubNav(!showSubNav)}
                type='button'
            >
                {children}
            </button>

            <DropdownItem items={items} show={showSubNav} />
        </div>
    );
}
