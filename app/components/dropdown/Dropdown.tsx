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
                    disabled &&
                        'bg-lm-disabled dark:bg-dm-disabled dark:text-dm-text-disabled dark:border-dm-disabled text-lm-text-disabled',
                    !disabled &&
                        'text-lm-text-hover bg-lm-secondary hover:bg-lm-primary active:bg-gray-200 dark:border-dm-primary dark:bg-dm-secondary dark:text-lm-secondary dark:hover:bg-dm-primary',
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
