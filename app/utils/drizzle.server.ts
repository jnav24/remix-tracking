import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as user from '../../db/schema/user';

const schema = {
    ...user,
};

export const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
});

export const db = drizzle(connection, { schema, mode: 'default' });
