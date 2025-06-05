import { FilterQuery, MikroORM, raw } from '@mikro-orm/core';
import config from './config/mikro-orm.config.js';
import { BookSearchPrismaVirtualEntity } from './entities/book-search-prisma-virtual.entity'
import { BookRevisionEntity } from './entities/book-revision.entity.js';

interface SearchResponseDto {
  total: number;
  items: any[];
}

/*
    Here is an example of how we interact with fragments in MikroORM.
    
    We have a main BookEntity entity, which is related to TagEntity for example.
    For each BookEntity there are a number of its own BookRevisionEntity, which stores
    a snapshot of the book's state at each point in time. To see who and when edited the book.

    Our task is to provide the ability to filter books by several fields, relations, etc.
    We need to return the number of books that match the filter, and the list of books itself.
*/
async function main() {
  const orm = await MikroORM.init(config);

  const em = orm.em.fork()

  /*
      Here we form our filter. In fact, in the project a large amount of data grows into it:
      - user input;
      - other entities from the database;
      - and other data.
  */
  const filter = buildFilterQuery();

  /*
      Below we have queries for getting the number of entities and their list.
      In fact, we don't use these methods explicitly, instead we form queries through QueryBuilder.
      The option using .findAndCount won't work for us, since we have our own optimizations for each query.

      In the real project, BookSearchPrismaVirtualEntity is quite cumbersome with many relations.
      It turns out that we search for books not only by them, but also through revisions and other entities.
  */
  const total = await em.count(BookSearchPrismaVirtualEntity, filter);
  const books = await em.find(BookSearchPrismaVirtualEntity, filter, { fields: ['id'] });
  const items = await em.find(BookRevisionEntity, { book: books });

  const response: SearchResponseDto = { total, items };

  console.log({ response });

  process.exit(0);
}

function buildFilterQuery(): FilterQuery<BookSearchPrismaVirtualEntity> {
  const requiredTag = 'hit';

  /*
      Additionally, we have BookSearchMetaEntity, in which we also save data,
      pre-prepared for search optimization. As a rule, they are represented in JSONB,
      so we use native functions (for example json_path_exists in PostgreSQL).
  */
  const filter: FilterQuery<BookSearchPrismaVirtualEntity> = {
    [raw(`(SELECT 1 FROM json_each(tags) WHERE json_each.value = '${requiredTag}')`)]: []
  };
  return filter;
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});