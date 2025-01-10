const express = require('express');
const app = express();
const port = 3000;

const notFoundError = require('./middlewares/notFound');
const router = require('./routers/router')

app.use(express.static('public'))

app.get('/', (_, res) => {
    res.send('Server is running')
})

app.use('/api/movies', router)

app.use(notFoundError)

app.listen(port, () => {
    console.log(`Listen to port: ${port}`)
})