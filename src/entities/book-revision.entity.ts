import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BookFieldsEntity } from './book-fields.entity';
import { BookEntity } from './boot.entity';

@Entity()
export class BookRevisionEntity extends BookFieldsEntity {
    @ManyToOne(() => BookEntity)
    book: BookEntity;

    @Property({ type: 'jsonb' })
    tags: string[];

    @Property({ type: 'number' })
    version: number;

    constructor(book: BookEntity) {
        super();

        this.tags = book.tags.getItems().map(tag => tag.title);
        this.book = book;
        this.title = book.title;
        this.author = book.author;
        this.price = book.price;
        this.version = book.version;
    }
}

