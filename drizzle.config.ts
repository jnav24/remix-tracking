import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './db/schema/*',
    out: './db/generated',
    dialect: 'mysql',
    dbCredentials: {
        host: process.env.DB_HOST ?? '',
        user: process.env.DB_USERNAME ?? '',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_DATABASE ?? '',
    },
});
