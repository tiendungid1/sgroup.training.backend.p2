// @ts-check
/**
 * @param {import("knex")} knex
 */
export function up(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary('id');
        table.string('username').notNullable().unique('username');
        table.string('fullname');
        table.string('email');
        table.string('password');
        table.timestamps(true, true);
    });
}

/**
 * @param {import("knex")} knex
 */
export function down(knex) { return knex.schema.dropTableIfExists('users'); }
