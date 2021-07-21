// @ts-check
/**
 * @param {import("knex")} knex
 */
export function up(knex) {
    return knex.schema.createTable('roles', table => {
        table.increments('id');
        table.string('name');
    });
}

/**
 * @param {import("knex")} knex
 */
export function down(knex) { return knex.schema.dropTableIfExists('roles'); }
