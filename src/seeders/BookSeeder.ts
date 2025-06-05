import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { BookEntity } from '../entities/boot.entity';
import { BookRevisionEntity } from '../entities/book-revision.entity';
import { TagEntity } from '../entities/tag.entity';

export class BookSeeder extends Seeder {

    async run(em: EntityManager): Promise<void> {
        const tag = em.create(TagEntity, { title: 'hit' });

        await em.persistAndFlush(tag);

        const books = [
            { title: 'Brave New World', author: 'Aldous Huxley', price: 123, tags: [tag] },
            { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 456 },
            { title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 789 },
            { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 1011 },
            { title: 'Pride and Prejudice', author: 'Jane Austen', price: 1213 }
        ];

        const bookEntities = books.map(bookData => em.create(BookEntity, bookData));

        await em.persistAndFlush(bookEntities);

        const bookRevisionEntities = bookEntities.map(bookEntity => new BookRevisionEntity(bookEntity));

        await em.persistAndFlush(bookRevisionEntities);
    }
}