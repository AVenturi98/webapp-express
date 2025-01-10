const connection = require('../data/db')

function index(_, res) {
    const sql = 'SELECT * FROM `movies`'
    connection.query(sql, (err, movies) => {
        if (err) {
            res.status(404).json({
                message: 'Error'
            })
        } else res.json(movies)
    })
}

function show(_, res) {
    res.json({
        message: 'Show'
    })
}

module.exports = { index, show }