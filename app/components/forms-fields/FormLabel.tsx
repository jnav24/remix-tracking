type Props = {
    error: string | null;
    label: string;
    labelId: string;
};

export default function FormLabel({ error, label, labelId }: Props) {
    return (
        <label htmlFor={labelId} className={`text-sm ${!error ? 'text-gray-400' : 'text-red-600'}`}>
            {label}
        </label>
    );
}
