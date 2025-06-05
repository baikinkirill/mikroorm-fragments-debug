import { Migration } from '@mikro-orm/migrations';

export class Migration20250605115816 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`book_entity\` (\`id\` integer not null primary key autoincrement, \`title\` text not null, \`author\` text not null, \`price\` real null, \`version\` integer not null default 1);`);

    this.addSql(`create table \`book_revision_entity\` (\`id\` integer not null primary key autoincrement, \`title\` text not null, \`author\` text not null, \`price\` real null, \`book_id\` integer not null, \`tags\` json not null, \`version\` integer not null, constraint \`book_revision_entity_book_id_foreign\` foreign key(\`book_id\`) references \`book_entity\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`book_revision_entity_book_id_index\` on \`book_revision_entity\` (\`book_id\`);`);

    this.addSql(`create table \`tag_entity\` (\`id\` integer not null primary key autoincrement, \`title\` text not null);`);

    this.addSql(`create table \`book_tag_pivot_entity\` (\`book_id\` integer not null, \`tag_id\` integer not null, constraint \`book_tag_pivot_entity_book_id_foreign\` foreign key(\`book_id\`) references \`book_entity\`(\`id\`) on delete cascade on update cascade, constraint \`book_tag_pivot_entity_tag_id_foreign\` foreign key(\`tag_id\`) references \`tag_entity\`(\`id\`) on update cascade, primary key (\`book_id\`));`);
    this.addSql(`create index \`book_tag_pivot_entity_book_id_index\` on \`book_tag_pivot_entity\` (\`book_id\`);`);
    this.addSql(`create index \`book_tag_pivot_entity_tag_id_index\` on \`book_tag_pivot_entity\` (\`tag_id\`);`);
  }

}
