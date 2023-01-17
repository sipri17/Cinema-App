const errorHandler = (err, req, res, next) => {
    console.log(err)
    let code = 500
    let message = 'Internal Server Error'

    if (err.name === '400error') {
        code = 400
        message = err.message
    } else if (err.name === '404error') {
        code = 404
        message = err.message
    } else if (err.name === 'BSONTypeError') {
        code = 400
        message = 'Invalid User Id'
    }

    res.status(code).json({ message })
}


module.exports = errorHandler