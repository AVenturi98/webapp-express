const connection = require('../data/db')

function index(_, res) {
    // const sql = `SELECT * FROM 'movies'`
    // connection.query(sql, _, res, (movies) => {
    //     res.json(movies)
    // })
    res.json('Index')
}

function show(_, res) {
    res.json({
        message: 'Show'
    })
}

module.exports = { index, show }