import { Task } from "@/models/Task";

import type { Options } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";

const config: Options<PostgreSqlDriver> = {
  type: "postgresql",
  clientUrl: process.env.POSTGRES_URL,
  driverOptions: {
    connection: {
      ssl: process.env.POSTGRES_SSL
        ? process.env.POSTGRES_SSL === "true"
        : true,
    },
  },
  migrations: {
    path: "./migrations/",
    disableForeignKeys: false,
  },
  debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
  entities: [Task],
  allowGlobalContext: true,
};

export default config;
