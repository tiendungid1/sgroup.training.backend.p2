// @ts-check
/**
 * @param {import("knex")} knex
 */
export function up(knex) {
    return knex.schema.createTable('users_roles', table => {
        table.increments('id');
        table.integer('user_id').unsigned().references('id').inTable('users')
            .onDelete('CASCADE');
        table.integer('role_id').unsigned().references('id').inTable('roles')
            .onDelete('CASCADE');
    });
}

/**
 * @param {import("knex")} knex
 */
export function down(knex) { return knex.schema.dropTableIfExists('users_roles'); }
