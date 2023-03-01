const { timestamps, onUpdateTrigger, ON_UPDATE_TIMESTAMP_FUNCTION } = require('../utils');

exports.up = async function (knex) {
    await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
    const migration = await knex.schema.createTable('tasks', function (table) {
        table.bigIncrements('id');
        table.string('refId');
        table.text('title');
        table.datetime('endDate');
        table.tinyint('status').unsigned().defaultTo(1);
        timestamps(knex, table);
    });
    await knex.raw(onUpdateTrigger('tasks'));
    return migration;
};


exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tasks');
};
