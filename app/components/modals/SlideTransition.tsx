import React, { useEffect, useMemo, useRef } from 'react';
import './slide-transition-styles.css';
import { cn } from '~/utils/helpers';

type Props = {
    children: React.ReactNode;
    delay?: number;
    direction: 'left' | 'up'; // @todo when below todo is fixed, add down and right
    duration?: number;
    show: boolean;
};

// @todo only up and left directions work properly atm
export default function SlideTransition({ children, delay = 0.15, direction, show }: Props) {
    const elem = useRef<HTMLDivElement>(null);

    const opposite_direction = useMemo(() => {
        switch (direction) {
            // case 'down':
            //     return 'up';
            case 'left':
                return 'right';
            case 'up':
                return 'down';
            // case 'right':
            //     return 'left';
        }
    }, [direction]);

    useEffect(() => {
        let timeoutId: undefined | NodeJS.Timeout;

        if (show) {
            elem?.current?.classList.remove('out');
            elem?.current?.classList.add(direction);
        } else {
            elem?.current?.classList.remove(direction);
            elem?.current?.classList.add(opposite_direction);
            timeoutId = setTimeout(() => {
                elem?.current?.classList.add('out');
                elem?.current?.classList.remove(opposite_direction);
            }, delay * 1000);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [show]);

    return (
        <>
            <div className={cn('animated animated-slide out')} ref={elem}>
                {children}
            </div>
        </>
    );
}
