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
        },
        {
            id: 4, username: 'visitor4', fullname: 'Visitor 4', email: 'visitor4@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 5, username: 'visitor5', fullname: 'Visitor 5', email: 'visitor5@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 6, username: 'visitor6', fullname: 'Visitor 6', email: 'visitor6@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 7, username: 'visitor7', fullname: 'Visitor 7', email: 'visitor7@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 8, username: 'visitor8', fullname: 'Visitor 8', email: 'visitor8@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 9, username: 'visitor9', fullname: 'Visitor 9', email: 'visitor9@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 10, username: 'visitor10', fullname: 'Visitor 10', email: 'visitor10@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 11, username: 'visitor11', fullname: 'Visitor 11', email: 'visitor11@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 12, username: 'visitor12', fullname: 'Visitor 12', email: 'visitor12@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 13, username: 'visitor13', fullname: 'Visitor 13', email: 'visitor13@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 14, username: 'visitor14', fullname: 'Visitor 14', email: 'visitor14@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        },
        {
            id: 15, username: 'visitor15', fullname: 'Visitor 15', email: 'visitor15@gmail.com', password: '$2a$10$t1WDiR5YTs8lpJXnwlsuTOBfchMPxm4voeE4FVknM/dmQE0vPxvM2'
        }
    ]));
