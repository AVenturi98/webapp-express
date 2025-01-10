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
    //BONUS: recuperare la media di valutazione di ogni libro
}

function show(req, res) {
    const id = parseInt(req.params.id)
    const sql = `SELECT * FROM movies WHERE id = ?`
    connection.query(sql, [id], (_, result) => {

        const movie = result[0]

        res.json(movie)
    })
}

module.exports = { index, show }