import type {
  Connection,
  EntityManager,
  IDatabaseDriver,
} from "@mikro-orm/core";

export type EMType = EntityManager<IDatabaseDriver<Connection>>;
