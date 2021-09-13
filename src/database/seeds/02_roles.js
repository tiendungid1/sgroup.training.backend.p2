// eslint-disable-next-line func-names
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('roles').del()
        .then(() =>
            // Inserts seed entries
            // eslint-disable-next-line implicit-arrow-linebreak
            knex('roles').insert([
                { id: 1, name: 'ADMIN' },
                { id: 2, name: 'MODERATOR' },
                { id: 3, name: 'AUTHOR' },
                { id: 4, name: 'VISITOR' }
            ]));
};
