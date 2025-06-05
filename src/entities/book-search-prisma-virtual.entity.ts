import { Entity, Property } from "@mikro-orm/core";

const SEARCH_PRISMA_ENTITY = `
    SELECT 
        b.id as id,
        b.title as title,
        b.author as author,
        b.price as price,
        r.tags as tags
    FROM book_entity b
    INNER JOIN book_revision_entity r ON r.book_id = b.id and r.version = b.version
`

@Entity({ virtual: true, expression: SEARCH_PRISMA_ENTITY })
export class BookSearchPrismaVirtualEntity {
    @Property({ type: 'number' })
    id!: number;

    @Property({ type: 'text' })
    title!: string;

    @Property({ type: 'text' })
    author!: string;

    @Property({ type: 'float' })
    price!: number;

    @Property({ type: 'jsonb' })
    tags!: string[];
}