/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTableIfNotExists('skills', (table) => {
    table.increments();
    table.string('name');
    table.string('description');
    table.text('image');
    table.smallint('levelsAmount')
      .unsigned();
    table.integer('costPerLevel')
      .unsigned();
    table.integer('coinsPerTapBonus')
      .unsigned();
    table.integer('passiveCoinsBonus')
      .unsigned();
    table.integer('energyBonus')
      .unsigned();
    table.dateTime('deletedAt');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('skills');
