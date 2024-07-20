import React from 'react';
import { cn } from '~/utils/helpers';

type TagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p';

type Props = {
    children: React.ReactNode;
    className?: string;
    color?: 'primary' | 'secondary' | 'danger';
    tag?: TagType;
    variant:
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'body1'
        | 'body2'
        | 'caption'
        | 'subhead'
        | 'subhead2';
};

export default function Typography({ children, className = '', color, tag, variant }: Props) {
    const variantsMapping = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        caption: 'p',
        subhead: 'h4',
        subhead2: 'h4',
        body1: 'p',
        body2: 'p',
    };

    const styles = () => {
        const classes = [];

        switch (variantsMapping[variant] ?? 'p') {
            case 'h1':
                classes.push('text-4xl font-header');
                break;
            case 'h2':
                classes.push('text-3xl font-light leading-9');
                break;
            case 'h3':
                classes.push('text-2xl font-header');
                break;
            case 'h4':
                classes.push('text-xl font-header');
                break;
            case 'h5':
                classes.push('text-lg font-header');
                break;
            default:
                if (variant === 'caption') {
                    classes.push('text-sm dark:text-gray-300');
                } else {
                    classes.push('text-base');
                }
                break;
        }

        switch (color) {
            case 'primary':
                classes.push('text-primary dark:text-light-primary');
                break;
            case 'secondary':
                classes.push('text-secondary dark:text-light-secondary');
                break;
            case 'danger':
                classes.push('text-danger dark:text-light-danger');
                break;
            default:
                classes.push('text-gray-700 dark:text-gray-100');
                break;
        }

        return cn(classes, className);
    };

    const Component: TagType = tag ?? (variantsMapping[variant] as TagType) ?? 'p';

    return <Component className={styles()}>{children}</Component>;
}
