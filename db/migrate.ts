import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from '@utils/drizzle.server';

await migrate(db, { migrationsFolder: './db/migrations' });

await connection.end();
