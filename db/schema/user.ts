import { mysqlTable, varchar, datetime } from 'drizzle-orm/mysql-core';
import { ids, softDeletes, timestamps } from '../utils';

export const user = mysqlTable('users', {
    ...ids,
    email: varchar('email', { length: 256 }),
    emailVerifiedAt: datetime('email_verified_at', { mode: 'date' }),
    password: varchar('password', { length: 256 }),
    rememberMe: varchar('remember_me', { length: 256 }),
    ...timestamps,
    ...softDeletes,
});
