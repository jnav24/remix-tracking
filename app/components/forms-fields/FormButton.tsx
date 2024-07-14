import React, { ButtonHTMLAttributes, DetailedHTMLProps, useMemo } from 'react';

export type ButtonColor =
    | 'default'
    | 'primary'
    | 'primary-g'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'primary-bd'
    | 'primary-white'
    | 'primary-dark';

export type FormButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    block?: boolean;
    checkbox?: boolean;
    children: React.ReactNode;
    color?: ButtonColor;
    fab?: boolean;
    filled?: boolean;
    size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
    submit?: boolean;
    type?: 'button' | 'submit' | 'reset';
};

export default function FormButton(props: FormButtonProps) {
    const { block, checkbox, color, fab, filled, size, submit, ...rest } = props;

    const buttonType = useMemo(() => {
        if (submit) {
            return 'submit';
        }

        return props.type || 'button';
    }, [props]);

    const getButtonStyles = () => {
        let styles = 'focus:outline-none focus:shadow-outline transition duration-150 ';

        if (!props.disabled) {
            switch (color) {
                case 'primary':
                    styles =
                        'bg-primary border-primary border hover:border-opacity-85 hover:bg-opacity-85 active:bg-dark-primary active:border-dark-primary text-white ';
                    break;
                case 'primary-g':
                    styles =
                        'bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-dark-primary hover:to-dark-primary text-white transition-all duration-150 ease-out hover:-translate-y-1 hover:scale-110 active:from-indigo-700 active:to-indigo-700 bg-size-200 bg-pos-0 hover:bg-pos-100 shadow-none hover:shadow-xl ';
                    break;
                case 'secondary':
                    styles =
                        'bg-secondary hover:bg-opacity-85 active:bg-dark-secondary text-gray-700 ';
                    break;
                case 'danger':
                    styles = 'bg-danger hover:bg-opacity-85 active:bg-dark-danger text-white ';
                    break;
                case 'success':
                    styles = 'bg-dark-success hover:bg-opacity-85 active:bg-success text-white ';
                    break;
                case 'primary-bd':
                    styles =
                        'shadow-none hover:shadow-xl transition-all duration-350 border border-primary text-primary ';
                    break;
                case 'primary-white':
                    styles = 'bg-white hover:bg-gray-200 text-primary shadow-md ';
                    break;
                case 'primary-dark':
                    styles = 'bg-gray-700 hover:bg-gray-900 text-white shadow-md ';
                    break;
                default:
                    if (!filled) {
                        styles += 'border-gray-300 border dark:border-gray-800 ';
                    }
                    styles +=
                        'bg-white hover:bg-gray-100 dark:bg-dark-main dark:hover:bg-dark-secondary active:bg-gray-200 text-gray-600 dark:text-gray-300 ';
                    break;
            }
        } else {
            styles += 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-800 cursor-text ';
        }

        if (fab) {
            styles += 'rounded-full p-2 mr-2 ';
        }

        if (checkbox) {
            styles += 'p-1 rounded-md ';
        }

        if (!fab && !checkbox) {
            styles += 'rounded-md text-sm mr-2 ';

            switch (size) {
                case '2xs':
                    styles += 'p-3';
                    break;
                case 'xs':
                    styles += 'px-5 py-3';
                    break;
                case 'sm':
                    styles += 'p-5';
                    break;
                case 'md':
                    styles += 'py-5 px-10';
                    break;
                case 'lg':
                default:
                    styles += 'py-5 px-20 ';
                    break;
            }
        }

        if (block) {
            styles += 'w-full ';
        }

        return styles;
    };

    // @todo
    // consider refactoring this component to use export type FormButtonProps = HTMLProps<HTMLButtonElement> & { ... }
    // and <button {...props}>. The HTMLProps imports from React. Figure out a way to handle defaults
    return (
        <>
            <button className={getButtonStyles()} {...rest} type={buttonType}>
                <span className='flex flex-row items-center justify-center'>{props.children}</span>
            </button>
        </>
    );
}
