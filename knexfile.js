require('dotenv').config();

module.exports = {
    development: {
        client: process.env.DATABASE_TYPE,
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: `${process.cwd()}/src/database/migrations`,
            tableName: 'migrations',
        },
        seeds: {
            directory: `${process.cwd()}/src/database/seeds`,
            tableName: 'seeds',
        }
    },
    production: {
        client: process.env.DATABASE_TYPE,
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: `${process.cwd()}/src/database/migrations`,
            tableName: 'migrations',
        },
        seeds: {
            directory: `${process.cwd()}/src/database/seeds`,
            tableName: 'seeds',
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};
