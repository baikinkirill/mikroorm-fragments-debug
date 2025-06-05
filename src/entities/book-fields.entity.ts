import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ abstract: true })
export abstract class BookFieldsEntity {
    @PrimaryKey()
    id!: number;

    @Property({ type: 'text' })
    title!: string;

    @Property({ type: 'text' })
    author!: string;

    @Property({ nullable: true, type: 'float' })
    price?: number;
}

