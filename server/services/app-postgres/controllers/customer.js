"user strict"

const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User, Movie, Genre, Cast } = require('../models')
const { Op } = require('sequelize')

class CustomerController {  

    static async showAllMovies(req, res, next) {
        try {

            // let { page, filter } = req.query;

            // const paramQuerySQL = {
            //     include: [User, Genre],
            //     order: [
            //         ['title', 'ASC']
            //     ],
            //     where: {
            //         status : 'Active'
            //     },
            //     limit : 8
            // };
            // let offset;

            // // pagination
            // if (page !== '' && typeof page !== 'undefined') {            
            //         paramQuerySQL.offset = page * 8 - 8;
            // }
            //  else {
            //     paramQuerySQL.offset = 0;
            // }


            // if (filter !== '' && typeof filter !== 'undefined') {
            //     filter = "%" + filter + "%"
            //     paramQuerySQL.where = {
            //         title: { [Op.iLike]: filter },
            //     };
            // }




            const movie = await Movie.findAll()
            const totalMovie = await Movie.count()
            

            res.status(200).json(movie)

        } catch (error) {
            next(error)
        }

    }

    static async showMovieById(req, res, next) {
        try {
            const { movieId } = req.params
            const movie = await Movie.findByPk(movieId, {
                include: [User, Genre,Cast]

            })
            if (!movie) {
                throw { name: '404data not found', message: 'Movie not found' }
            }
            res.status(200).json(movie)
        } catch (error) {

            next(error)
        }
    }

   




}


module.exports = CustomerController