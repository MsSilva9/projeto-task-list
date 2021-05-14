import { Knex } from "knex";
import path from "path";

const configuration: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "dbtask-list.sqlite")
  },
  migrations: {
    directory: path.resolve(__dirname, "migrations")
  },
  useNullAsDefault: true
};

export default configuration;