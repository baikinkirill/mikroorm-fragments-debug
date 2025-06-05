import { Collection, Entity, ManyToMany, OptionalProps, Property } from '@mikro-orm/core';
import { BookFieldsEntity } from './book-fields.entity';
import { TagEntity } from './tag.entity';
import { BookTagPivotEntity } from './book-tag-pivot.entity';

@Entity()
export class BookEntity extends BookFieldsEntity {
  [OptionalProps]?: 'version';

  @ManyToMany({ entity: () => TagEntity, pivotEntity: () => BookTagPivotEntity })
  tags = new Collection<TagEntity>(this);

  @Property({ version: true })
  version!: number;
}

