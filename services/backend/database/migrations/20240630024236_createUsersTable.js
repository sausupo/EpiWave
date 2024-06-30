/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) =>
  knex.schema.createTableIfNotExists('users', (table) => {
    table.integer('userId')
      .index()
      .unique();
    table.integer('level');
    table.integer('energyAmount')
      .unsigned();
    table.bigint('coinsAmount')
      .unsigned();
    table.integer('coinsPerTapAmount')
      .unsigned();
    table.integer('passiveCoinsAmount')
      .unsigned();
    table.dateTime('lastActivityTime');
    table.dateTime('energyRecoveringTill');
    table.boolean('banned');
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTableIfExists('users');
