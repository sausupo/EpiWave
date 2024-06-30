/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTableIfNotExists('userSkillsTable', (table) => {
    table.integer('userId')
    .index()
    .unsigned()
    .references('userId')
    .inTable('users');

    table.integer('skillId')
    .unsigned()
    .references('id')
    .inTable('skills');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('userSkillsTable');
