const { timestamps, onUpdateTrigger } = require("../utils");

exports.up = async function (knex) {
    const migration = await knex.schema.createTable('edit_history', function (table) {
        table.bigIncrements('id');
        table.bigInteger('taskId');
        table.tinyint('type');
        table.string('value');
        timestamps(knex, table);
    });
    await knex.raw(onUpdateTrigger('edit_history'));
    return migration;
};


exports.down = function (knex) {
    return knex.schema.dropTableIfExists('edit_history');
};
