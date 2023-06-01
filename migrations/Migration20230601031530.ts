import { Migration } from '@mikro-orm/migrations';

export class Migration20230601031530 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tasks" ("id" varchar(255) not null, "slug" varchar(255) not null, "subject" varchar(255) not null, "description" varchar(255) not null, constraint "tasks_pkey" primary key ("id"));');
    this.addSql('create index "tasks_slug_index" on "tasks" ("slug");');
  }

}
