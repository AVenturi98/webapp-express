function notFound(_, res) {
    res.status(404)
    res.json({
        error: 'Not Found',
        message: 'Page not found'
    })
}

module.exports = notFound