import { defineConfig } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import path from 'path';
import { BookEntity } from '../entities/boot.entity';
import { BookFieldsEntity } from '../entities/book-fields.entity';
import { BookTagPivotEntity } from '../entities/book-tag-pivot.entity';
import { TagEntity } from '../entities/tag.entity';
import { BookRevisionEntity } from '../entities/book-revision.entity';
import { BookSearchPrismaVirtualEntity } from '../entities/book-search-prisma-virtual.entity';

export default defineConfig({
  entities: [BookEntity, BookFieldsEntity, BookRevisionEntity, BookTagPivotEntity, TagEntity, BookSearchPrismaVirtualEntity],
  dbName: path.join(process.cwd(), 'database.sqlite'),
  driver: SqliteDriver,
  migrations: {
    path: path.join(__dirname, '../migrations'),
    pathTs: path.join(process.cwd(), 'src/migrations'),
  },
  seeder: {
    path: path.join(__dirname, '../seeders'),
    pathTs: path.join(process.cwd(), 'src/seeders'),
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
  },
  debug: true,
});

