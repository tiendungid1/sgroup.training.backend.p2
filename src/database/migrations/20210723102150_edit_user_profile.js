// @ts-check

import { UserStatus } from "common/enum";

/**
 * @param {import("knex")} knex
 */
export function up(knex) {
    return knex.schema.alterTable('users', table => {
        table.string('city');
        table.string('avatar').defaultTo('https://mpng.subpng.com/20180810/tz/kisspng-shiba-inu-dogecoin-clip-art-scalable-vector-graphi-doge-pixel-www-pixshark-com-images-galleries-wit-5b6d30af29d5d9.5368936015338825431714.jpg');
        table.integer('age');
        table.enum('status', Object.values(UserStatus)).defaultTo(UserStatus.AVAILABLE);
        table.boolean('deleted').defaultTo(false);
        table.date('deleted_At').defaultTo(null);
    });
}

/**
 * @param {import("knex")} knex
 */
export function down(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('city');
        table.dropColumn('avatar');
        table.dropColumn('age');
        table.dropColumn('status');
    });
}
