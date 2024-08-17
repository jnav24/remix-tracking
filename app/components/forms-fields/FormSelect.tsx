import { BaseSyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import useAppForm from '~/hooks/useAppForm';
import FormLabel from '~/components/forms-fields/FormLabel';
import ChevronDownIcon from '~/components/icons/ChevronDownIcon';
import { RulesType } from '~/utils/form-validator';

type Props = {
    defaultValue?: string;
    handleUpdateInput?: (v: string) => void;
    isDisabled?: boolean;
    itemLabel?: string;
    items: SelectItems[];
    itemValue?: string;
    label?: string;
    name?: string;
    placeholder?: string;
    rules?: RulesType | Array<keyof RulesType>;
};

type SelectItems = Record<string, string>;

export default function FormSelect({
    handleUpdateInput,
    defaultValue = '',
    isDisabled = false,
    itemLabel = 'label',
    items,
    itemValue = 'value',
    label = '',
    name,
    placeholder = 'Select',
    rules = [],
}: Props) {
    const [isDropDownOpened, setIsDropDownOpened] = useState(false);
    const dropDownItems = useRef<HTMLDivElement>(null);

    const { error, labelId, getInputValue, updateInputValue } = useAppForm({
        label,
        value: defaultValue,
        validateOnInit: false,
        rules,
        name,
    });

    const updateValue = (inputValue: BaseSyntheticEvent) => {
        updateInputValue(inputValue);
        handleUpdateInput?.(inputValue.target.value);
    };

    useEffect(() => {
        dropDownItems.current?.classList.add('h-0', 'py-0');
    }, []);

    useEffect(() => {
        let timeoutId: undefined | NodeJS.Timeout;

        if (!isDropDownOpened) {
            timeoutId = setTimeout(() => dropDownItems.current?.classList.add('h-0', 'py-0'), 300);
        } else {
            dropDownItems.current?.classList.remove('h-auto', 'py-1');
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isDropDownOpened]);

    const isValueSelected = useMemo(
        () => getInputValue && (Number(getInputValue) > 0 || getInputValue.length),
        [getInputValue],
    );

    const getPlaceholder = useMemo(() => {
        const text: SelectItems =
            items.find((obj: SelectItems) => getInputValue === obj[itemValue]) ?? {};

        if (isValueSelected && text && text[itemLabel]) {
            return text[itemLabel];
        }

        return placeholder;
    }, [getInputValue]);

    const toggleDropDownMenu = () => {
        if (!isDisabled) {
            setIsDropDownOpened(!isDropDownOpened);
        }
    };

    const handleBlur = () => {
        if (!isDisabled) {
            setIsDropDownOpened(false);
            updateValue({ target: { value: getInputValue } } as BaseSyntheticEvent);
        }
    };

    return (
        <div>
            <input type='hidden' name={labelId} id={labelId} value={getInputValue} />
            <FormLabel error={error} label={label} labelId={labelId} />

            <div
                className={clsx(
                    'relative mt-2 flex items-center justify-between rounded-md border border-solid px-2 py-2 outline-none',
                    error && !isDisabled && 'border-red-600 bg-white text-red-600',
                    !error &&
                        !isDisabled &&
                        'cursor-pointer border-gray-300 bg-white text-gray-600 transition duration-300 hover:border-dm-stroke hover:text-gray-700 focus:border-primary dark:border-dm-stroke dark:bg-dm-secondary',
                    isDisabled &&
                        'cursor-text border-gray-300 bg-gray-200 text-gray-500 dark:border-gray-600 dark:bg-gray-800',
                    !isDropDownOpened ? 'z-0' : 'z-50',
                )}
                role='listbox'
                tabIndex={0}
                onBlur={handleBlur}
                onClick={toggleDropDownMenu}
                onKeyDown={toggleDropDownMenu}
            >
                <span className='flex-1 text-left text-sm text-gray-500'>{getPlaceholder}</span>
                <ChevronDownIcon
                    className={clsx(
                        'h-6 w-6 transition duration-300',
                        isDropDownOpened ? 'rotate-180' : 'rotate-0',
                    )}
                />

                <div
                    className={clsx(
                        'dark:bg-dark-main absolute left-0 top-0 max-h-48 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow-sm transition duration-300 ease-out',
                        isDropDownOpened ? 'translate-y-12 opacity-100' : 'translate-y-0 opacity-0',
                    )}
                    ref={dropDownItems}
                >
                    {items.map((item, index) => (
                        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
                        <div
                            className='p-2 text-sm hover:bg-gray-200'
                            onClick={() =>
                                updateValue({
                                    target: { value: item[itemValue] },
                                } as BaseSyntheticEvent)
                            }
                            onKeyDown={() => null}
                            key={index}
                            role='button'
                        >
                            {item[itemLabel]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
