exports.seed = knex => knex('users').del() // Deletes ALL existing entries
    .then(() => knex('users').insert([ // Inserts seed entries
        {
            id: 1, username: 'adminfus', fullname: 'Admin Fus', email: 'admin@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 2, username: 'modfus', fullname: 'Mod Fus', email: 'mod@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 3, username: 'authorfus', fullname: 'Author Fus', email: 'author@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        }
    ]));
