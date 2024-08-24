import React, { useEffect, useState } from 'react';
import { cn } from '~/utils/helpers';
import FadeTransition from '~/components/modals/FadeTransition';
import TransitionOverlay from '~/components/modals/TransitionOverlay';
import SlideTransition from '~/components/modals/SlideTransition';
import Typography from '~/components/elements/Typography';
import FormButton from '~/components/forms-fields/FormButton';
import CancelIcon from '~/components/icons/outline/CancelIcon';

type Props = {
    children: React.ReactNode;
    closeSlide: () => void;
    showSlide?: boolean;
    title?: string;
};

export default function Drawer({ children, showSlide = false, closeSlide, title }: Props) {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        let timeoutId: undefined | NodeJS.Timeout = undefined;

        if (showSlide) {
            setShowContent(true);
        } else {
            timeoutId = setTimeout(() => setShowContent(false), 300);
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [showSlide]);

    return (
        <>
            <FadeTransition show={showSlide}>
                <TransitionOverlay handleClose={closeSlide} />

                <SlideTransition direction='left' show={showSlide}>
                    <div
                        className={cn(
                            'absolute right-0 top-0 z-10 flex h-screen justify-end',
                            `w-full md:w-128`,
                        )}
                    >
                        <div
                            className={cn(
                                'flex h-full w-full flex-col overflow-y-scroll bg-lm-secondary shadow-xl dark:bg-dm-primary',
                            )}
                            role='dialog'
                            aria-modal='true'
                            aria-labelledby='slideover-content'
                        >
                            <div className='flex flex-row items-center justify-between pl-12 pt-4'>
                                <div>{title && <Typography variant='h3'>{title}</Typography>}</div>
                                <FormButton onClick={closeSlide} size='xs' variant='text'>
                                    <CancelIcon className='size-6 text-lm-stroke' />
                                </FormButton>
                            </div>
                            {showContent && children}
                        </div>
                    </div>
                </SlideTransition>
            </FadeTransition>
        </>
    );
}
