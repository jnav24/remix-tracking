import { ReactNode, useEffect, useState } from 'react';
import FadeTransition from '~/components/modals/FadeTransition';
import TransitionOverlay from '~/components/modals/TransitionOverlay';
import SlideTransition from '~/components/modals/SlideTransition';
import { cn } from '~/utils/helpers';
import FormButton from '~/components/forms-fields/FormButton';

type Props = {
    children: ReactNode;
    closeModal: () => void;
    hideCloseButton?: boolean;
    persistent?: boolean;
    showModal: boolean;
};

export default function Modal({
    children,
    closeModal,
    hideCloseButton,
    persistent = false,
    showModal,
}: Props) {
    const [state, setState] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(
            () => {
                setState(showModal);
            },
            !showModal ? 500 : 0,
        );

        return () => {
            clearTimeout(timeoutId);
        };
    }, [showModal]);

    return (
        <>
            {state && (
                <FadeTransition show={showModal}>
                    <div className='flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0'>
                        <TransitionOverlay handleClose={() => !persistent && closeModal()} />

                        <SlideTransition direction='up' duration={0.35} show={showModal}>
                            {/* This element is to trick the browser into centering the modal contents. */}
                            <span className='hidden sm:inline-block sm:h-screen sm:align-middle' />
                            &#8203;
                            <section
                                className={cn(
                                    'relative z-10 inline-block overflow-x-hidden rounded-lg bg-white text-left align-bottom shadow-xl dark:bg-gray-900 sm:my-8 sm:align-middle',
                                )}
                                role='dialog'
                                aria-modal='true'
                                aria-labelledby='modal-content'
                            >
                                {children}
                                {!hideCloseButton && (
                                    <FormButton onClick={closeModal}>Close</FormButton>
                                )}
                            </section>
                        </SlideTransition>
                    </div>
                </FadeTransition>
            )}
        </>
    );
}
