// eslint-disable-next-line func-names
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users_roles').del()
        .then(() =>
            // Inserts seed entries
            // eslint-disable-next-line implicit-arrow-linebreak
            knex('users_roles').insert([
                { id: 1, user_id: 1, role_id: 1 },
                { id: 2, user_id: 2, role_id: 2 },
                { id: 3, user_id: 3, role_id: 3 },
                { id: 4, user_id: 4, role_id: 4 },
                { id: 5, user_id: 5, role_id: 4 },
                { id: 6, user_id: 6, role_id: 4 },
                { id: 7, user_id: 7, role_id: 4 },
                { id: 8, user_id: 8, role_id: 4 },
                { id: 9, user_id: 9, role_id: 4 },
                { id: 10, user_id: 10, role_id: 4 },
                { id: 11, user_id: 11, role_id: 4 },
                { id: 12, user_id: 12, role_id: 4 },
                { id: 13, user_id: 13, role_id: 4 },
                { id: 14, user_id: 14, role_id: 4 },
                { id: 15, user_id: 15, role_id: 4 }
            ]));
};
