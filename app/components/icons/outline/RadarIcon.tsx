type Props = {
    className: string;
};

export default function RadarIcon({ className }: Props) {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            className={className}
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0' />
            <path d='M15.51 15.56a5 5 0 1 0 -3.51 1.44' />
            <path d='M18.832 17.86a9 9 0 1 0 -6.832 3.14' />
            <path d='M12 12v9' />
        </svg>
    );
}
