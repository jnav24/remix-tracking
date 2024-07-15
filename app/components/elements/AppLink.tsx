import { Link, LinkProps } from '@remix-run/react';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
} & LinkProps;

export default function AppLink({ children, ...rest }: Props) {
    return (
        <Link className='text-primary-focus hover:text-primary' {...rest}>
            {children}
        </Link>
    );
}
