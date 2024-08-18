import React from 'react';
import { cn } from '~/utils/helpers';

type Props = {
    bgColor?: string;
    children: React.ReactNode;
    className?: string;
};

export default function TableRow({ bgColor, children, className }: Props) {
    return (
        <div
            className={cn(
                bgColor ??
                    'bg-lm-secondary hover:bg-lm-stroke dark:bg-dm-secondary dark:hover:bg-dm-primary/25',
                'flex flex-row items-center space-x-4 border-0 border-lm-stroke px-4 py-6 shadow-sm dark:border-dm-stroke',
                className,
            )}
        >
            {children}
        </div>
    );
}
