import { Entity, ManyToOne } from "@mikro-orm/core";
import { BookEntity } from "./boot.entity";
import { TagEntity } from "./tag.entity";

@Entity()
export class BookTagPivotEntity {
    @ManyToOne({entity: () => BookEntity, primary: true})
    book: BookEntity;

    @ManyToOne(() => TagEntity)
    tag: TagEntity;

    constructor(book: BookEntity, tag: TagEntity) {
        this.book = book;
        this.tag = tag;
    }
}