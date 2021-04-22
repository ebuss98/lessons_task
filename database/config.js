export default {
    development: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'lessonsdb',
        host: process.env.DB_HOST || 'localhost',
        omitNull: true,
        timezone: '+03:00',
        dialectOptions: {
            use: true,
            ssl: process.env.DB_SSL
        },
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
    },
    test: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'lessonsdbtest',
        host: process.env.DB_HOST || 'localhost',
        omitNull: true,
        timezone: '+03:00',
        dialectOptions: {
            use: true,
            ssl: process.env.DB_SSL
        },
        dialect: 'postgres',
        port: process.env.DB_PORT || 5432,
    }
}