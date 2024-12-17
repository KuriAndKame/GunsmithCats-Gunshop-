const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "MKisTheBest5./",
    port: 5432,
    host: "localhost",
    database: "gunshop"
})

module.exports = pool