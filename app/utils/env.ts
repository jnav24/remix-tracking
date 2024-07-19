import { EnvVariables } from '~/types/env';

export const getEnv = (value: keyof EnvVariables, defaultValue = '') => {
    if (typeof process !== 'undefined') {
        return process.env[value] ?? defaultValue;
    }

    return import.meta.env[`VITE_${value}`] ?? defaultValue;
};
