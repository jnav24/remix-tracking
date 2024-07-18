import { datetime, serial, varchar } from 'drizzle-orm/mysql-core';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const ids = {
    pk: serial('pk').primaryKey(),
    id: varchar('id', { length: 128 }).$defaultFn(() => createId()),
};

export const timestamps = {
    createdAt: datetime('created_at', { mode: 'date', fsp: 0 })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime('updated_at', { mode: 'date', fsp: 0 }),
};

export const softDeletes = {
    deletedAt: datetime('deleted_at', { mode: 'date', fsp: 0 }),
};
