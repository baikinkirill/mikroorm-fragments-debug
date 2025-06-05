import { FilterQuery, MikroORM, raw } from '@mikro-orm/core';
import config from './config/mikro-orm.config.js';
import { BookSearchPrismaVirtualEntity } from './entities/book-search-prisma-virtual.entity'
import { BookRevisionEntity } from './entities/book-revision.entity.js';

interface SearchResponseDto {
  total: number;
  items: any[];
}

async function main() {
  const orm = await MikroORM.init(config);

  const em = orm.em.fork()

  const requiredTag = 'hit';

  const filter: FilterQuery<BookSearchPrismaVirtualEntity> = {
    [raw(`(SELECT 1 FROM json_each(tags) WHERE json_each.value = '${requiredTag}')`)]: []
  }

  const total = await em.count(BookSearchPrismaVirtualEntity, filter);
  
  const bookSids = await em.find(BookSearchPrismaVirtualEntity, filter, { fields: ['id'] });

  const items = await em.find(BookRevisionEntity, { book: bookSids });

  const response: SearchResponseDto = { total, items };

  console.log({ response });

  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});