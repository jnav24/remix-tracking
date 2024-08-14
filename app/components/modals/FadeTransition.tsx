import React, { useEffect, useRef } from 'react';
import './fade-transition-styles.css';

type Props = {
    children: React.ReactNode;
    delay?: number;
    show: boolean;
};

export default function FadeTransition({ children, delay = 0.15, show }: Props) {
    const elem = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let timeoutId: undefined | NodeJS.Timeout = undefined;

        if (show) {
            elem?.current?.classList.remove('dn');
            elem?.current?.classList.add('fadeIn');
        } else {
            elem?.current?.classList.remove('fadeIn');
            elem?.current?.classList.add('fadeOut');
            timeoutId = setTimeout(() => {
                elem?.current?.classList.add('dn');
                elem?.current?.classList.remove('fadeOut');
            }, delay * 1000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [delay, show]);

    return (
        <>
            <div
                className='z-100 animated animated-fade dn fixed inset-0 overflow-hidden'
                ref={elem}
            >
                {children}
            </div>
        </>
    );
}
