import { Knex } from "knex";

const tableName = "tasks";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, table => {
    table.increments("id").primary();

    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("cascade")
      .onDelete("cascade");

    table.string("title").notNullable();
    table.text("description");

    table.date("delivery_date").notNullable();
    table.date("completed_date");

    table.timestamp("created_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("updated_at").notNullable().defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}