import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const ucFirst = (val: string): string => val.charAt(0).toUpperCase() + val.toLowerCase().slice(1);

const arrayColumn = <
    S extends keyof R,
    R extends Record<string, string | number | boolean | bigint>,
>(
    val: S,
    arr: Array<R>,
): Array<R[S]> => {
    return arr.map((obj: R) => obj[val] ?? null).filter((value: R[S]) => value);
};

const toCamelCase = (value: string): string => {
    const delimList: string[] = ['_', '-', ' '];
    let result = value.replace(/\s+/g, ' ').trim();

    delimList.forEach((delim: string) => {
        if (result.includes(delim)) {
            const list: string[] = value.split(delim);

            const camel = list.map((word: string, index: number) => {
                if (index) {
                    word = ucFirst(word);
                }

                return word;
            });

            result = camel.join('');
        }
    });

    return result;
};

const toTitleCase = (value: string) => {
    return value
        .replace(/[_-]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};

const toPascalCase = (value: string) => {
    return toTitleCase(value).replace(/\s+/, '');
};

const sortObject = <T extends Record<string, any>>(obj: T) => {
    const result = {} as T;
    const keys: Array<keyof T> = Object.keys(obj);
    keys.sort().forEach((key) => (result[key] = obj[key]));
    return result;
};

const randomString = (num: number) =>
    [...Array(num)].map(() => Math.random().toString(36)[2]).join('');

// @todo fix this
// const removeDuplicatesByUniqueKey = <K extends keyof T, T extends Record<string, any>>(
//     objArray: Array<T>,
//     uniqueId: K,
// ): Array<T> => {
//     return [...new Map(objArray.map((item) => [item[uniqueId], item])).values()];
// };

const getErrorMessage = (err: string | Error | unknown) => {
    if (err instanceof Error) {
        return err.message;
    }

    return err;
};

const parseNested = <R extends object>(item: R, value: string): string => {
    return value.split('.').reduce((result: string | R, current: string) => {
        if (typeof result !== 'string' && result[current as keyof R]) {
            return result[current as keyof R] as R;
        }

        return '';
    }, item) as string;
};

/**
 * This is based off Php's match which is a simple alternative to switch
 */
interface MatchType<T> {
    default: T;
    [key: string]: T;
}

const match = <T>(value: boolean | string | number, obj: MatchType<T>): T => {
    for (const [index, val] of Object.entries(obj)) {
        if (index === 'default') {
            return val;
        }

        for (const key of Object.values(index.split(','))) {
            if (value.toString() === key) {
                return val;
            }
        }
    }

    return obj.default;
};

type PluralTuple = [singular?: string | number | null, plural?: string | number | null];
type InterpolatableValue = string | number | PluralTuple;

const plural = (
    count: number,
): ((strings: TemplateStringsArray, ...interpolate: InterpolatableValue[]) => string) => {
    return (strings, ...interpolate) => {
        const isPlural = count > 1 || count === 0;

        const values = interpolate.map((value) => {
            if (Array.isArray(value)) {
                return value[isPlural ? 1 : 0] ?? '';
            }

            return value;
        });

        return strings
            .reduce((str, value, idx) => `${str}${value}${values[idx] ?? ''}`, '')
            .replace(/{(.*?)}/g, (_, m) => {
                if (typeof m === 'string') {
                    return m.split('|')[isPlural ? 1 : 0];
                }

                return m;
            })
            .replace('$count', count.toString());
    };
};

const matchy = <T>(value: boolean | string | number): ((obj: MatchType<T>) => T) => {
    return (obj) => match<T>(value, obj);
};

matchy<string>(200)({ default: 'this is the default message' });

export {
    arrayColumn,
    cn,
    toCamelCase,
    toTitleCase,
    sortObject,
    match,
    ucFirst,
    randomString,
    getErrorMessage,
    parseNested,
    toPascalCase,
    plural,
};
