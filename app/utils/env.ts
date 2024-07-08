type EnvVariables = {
    APP_SLUG: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_ROOT_PASSWORD: string;
    DB_DATABASE: string;
    DB_DATA_PATH: string;
    REDIS_PRIMARY_PORT: string;
    REDIS_REPLICA_PORT: string;
    REDIS_DATA_PATH: string;
    REDIS_PASSWORD: string;
    SESSION_NAME: string;
    SESSION_SECRET: string;
    HASH_KEY: string;
    ENCRYPT_SECRET: string;
};

export const getEnv = (value: keyof EnvVariables, defaultValue = '') => {
    if (typeof process !== 'undefined') {
        return process.env[value] ?? defaultValue;
    }

    return import.meta.env[`VITE_${value}`] ?? defaultValue;
};
