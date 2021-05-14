import knex from "knex";

import configuration from "./configuration";

const connection = knex(configuration);

export default connection;