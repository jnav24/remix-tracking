type Props = {
    handleClose: () => void;
};

export default function TransitionOverlay({ handleClose }: Props) {
    return (
        <>
            <div className='fixed inset-0'>
                <div
                    className='absolute inset-0 bg-black opacity-75'
                    onClick={handleClose}
                    onKeyDown={() => null}
                    role='button'
                    tabIndex={0}
                />
            </div>
        </>
    );
}
