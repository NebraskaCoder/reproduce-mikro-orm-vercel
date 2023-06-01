import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";

import mikroOrmConfig from "@/config/mikro-orm";

import type { PostgreSqlDriver, SqlEntityManager } from "@mikro-orm/postgresql";

let entityManager:
  | (SqlEntityManager<PostgreSqlDriver> &
      EntityManager<IDatabaseDriver<Connection>>)
  | null = null;

export async function initMikroOrm(): Promise<EntityManager> {
  if (!entityManager) {
    const orm = await MikroORM.init<PostgreSqlDriver>(mikroOrmConfig);
    await orm.getMigrator().up(); // Optional: Run migrations if needed

    entityManager = orm.em;
  }

  return entityManager;
}
