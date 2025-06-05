import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class TagEntity {
    @PrimaryKey()
    id!: number;

    @Property({ type: 'text' })
    title!: string;
}