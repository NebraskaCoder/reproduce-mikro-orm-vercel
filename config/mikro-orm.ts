import { Task } from "@/models/Task";

// Migrations
import { Migration20230601031530 } from "@/migrations/Migration20230601031530";

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
    migrationsList: [
      { name: "Migration20230601031530.ts", class: Migration20230601031530 },
    ],
    disableForeignKeys: false,
  },
  debug: process.env.DEBUG === "true" || process.env.DEBUG?.includes("db"),
  entities: [Task],
  allowGlobalContext: false,
};

export default config;
