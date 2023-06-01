import { v4 } from "uuid";
import { Entity, Index, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ tableName: "tasks" })
export class Task {
  @PrimaryKey()
  id: string = v4();

  @Property()
  @Index()
  slug!: string;

  @Property()
  subject!: string;

  @Property()
  description!: string;
}
