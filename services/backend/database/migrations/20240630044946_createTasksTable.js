/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTableIfNotExists('tasks', (table) => {
    table.increments();
    table.string('name');
    table.string('description');
    table.text('image');
    table.integer('coins')
      .unsigned();
    table.dateTime('deletedAt');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('tasks');
