import { Knex } from "knex";

const tableName = "users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, table => {
    table.increments("id").primary();

    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}