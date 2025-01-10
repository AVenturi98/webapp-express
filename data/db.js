const sens = require('../sensibili')
const sql = require('mysql2');

const connection = sql.createConnection({
    host: sens.DB_HOST,
    user: sens.DB_USER,
    password: sens.DB_PASSWORD,
    database: sens.DB_NAME
})

module.exports = connection