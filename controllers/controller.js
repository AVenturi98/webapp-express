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
    //recupero tutti gli id dai movies in maniera dinamica
    const sql_movie = `SELECT * FROM movies WHERE id = ?`

    connection.query(sql_movie, [id], (_, result) => {
        if (isNaN(id)) res.status(404).json({ message: err.message })

        if (result == 0) res.json({ error: 'error', message: 'this id is not available' })
        //movie avrà il valore del primo elemento del mio array
        const movie = result[0]
        //recupero tutti gli movie_id dalle reviews in maniera dinamica
        const sql_rew = `SELECT * FROM reviews WHERE movie_id = ?`
        connection.query(sql_rew, [id], (_, reviews) => {
            //prendo il moive selezionato insieme alle reviews equivalenti all'id
            movie.reviews = reviews
            res.json(movie)
        })
    })
}

module.exports = { index, show }