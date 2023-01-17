
const errorHandler = (err, req, res, next) => { 

  res.status(err.response.status).json(err.response.data)

}



module.exports = {errorHandler}