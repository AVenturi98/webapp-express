const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3500;

const notFoundError = require('./middlewares/notFound');
const movieRouter = require('./routers/router')

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/movies', movieRouter)

app.use(notFoundError)

app.listen(port, () => {
    console.log(`Listen to port: ${port}`)
})