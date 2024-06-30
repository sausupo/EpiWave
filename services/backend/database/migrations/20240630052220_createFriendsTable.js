/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTableIfNotExists('invitedFriends', (table) => {
    table.increments();
    table.integer('userId')
      .index()
      .unsigned()
      .references('userId')
      .inTable('users');
    table.integer('friendId');
    table.dateTime('deletedAt');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('invitedFriends');
