const connection = require('../data/db')

function index(_, res) {

    const sql = 'SELECT * FROM `movies`'
    //const sql_avg = `SELECT *, vote AS v FROM movies JOIN reviews ON movies.id = reviews.movie_id`

    connection.query(sql, (err, movies) => {
        if (err) {
            res.status(404).json({
                message: 'Error'
            })
        }
        res.json(movies)

    })
    //BONUS: recuperare la media di valutazione di ogni libro
}

function show(req, res) {

    const { id } = req.params

    //recupero tutti gli id dai movies in maniera dinamica
    const sql_movie = `SELECT * FROM movies WHERE id = ?`
    const sql_reviews = `
    SELECT *, vote
    FROM movies 
    JOIN reviews 
    ON movies.id = reviews.movie_id
    WHERE reviews.movie_id = ?`

    connection.query(sql_movie, [id], (err, result) => {
        if (err) res.status(500).json({ message: err.message })

        if (result == 0) res.status(404).json({ error: 'error', message: 'this id is not found' })

        //movie avrà il valore dell' elemento del mio array
        const movie = result[0]

        connection.query(sql_reviews, [id], (err, review) => {

            if (err) res.status(500).json({ message: err.message })

            // rinomino l'oggetto di ritorno
            movie.reviews = review

            const sql_avg = `SELECT CEIL(AVG(vote)) as vote_avg FROM reviews WHERE movie_id = ?`

            connection.query(sql_avg, [id], (err, avg) => {
                if (err) res.status(500).json({ message: err.message })

                movie.avg = avg
                res.json(movie)

            })

        })

    })
}

function post(req, res) {
    const { movie_id, vote, name, text } = req.body
    const sql_add = `
        INSERT INTO reviews  ( movie_id, vote, name, text )
        VALUES ( ?, ?, ?, ?)`

    connection.query(sql_add, [movie_id, vote, name, text], (err, result) => {
        if (err) res.status(500).json({ error: 'error', message: 'Not available' })

        res.status(201).json(result)
    })
}

module.exports = { index, show, post }