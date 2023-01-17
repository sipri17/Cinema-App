const { comparePassword, hashedPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User, Movie, Genre, Cast, sequelize } = require('../models')

class Controller {


    static async register(req, res, next) {
        try {

            let { username, email, password, phoneNumber, address } = req.body
            if (!password) {
                throw { name: "required", message: "password is required" }
            }


            const newUser = await User.create({ username, email, password, role: "Admin", phoneNumber, address })

            const payload = {
                id: newUser.id
            }


            res.status(201).json({
                id: newUser.id, email: newUser.email
            })
        } catch (error) {

            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) throw { name: 'data not found', message: 'error invalid email or password' }
            const validPassword = comparePassword(password, user.password)
            if (!validPassword) throw { name: 'data not found', message: 'error invalid email or password' }

            const payload = {
                id: user.id
            }

            const access_token = generateToken(payload)

            res.status(200).json({
                access_token
            })
        } catch (error) {

            next(error)
        }
    }

    static async showAllMovie(req, res, next) {
        try {
            
            const paramQuerySQL = {
                include: [Genre, Cast],
                order: [
                    ['title', 'ASC']
                ]
            };

            const movie = await Movie.findAll(paramQuerySQL)

            res.status(200).json(movie)

        } catch (error) {
            next(error)
        }
    }

    static async createMovie(req, res, next) {
        try {
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts } = req.body;
            let createdMovie;

            await sequelize.transaction(async (t) => {
                createdMovie = await Movie.create({ title, synopsis, trailerUrl, imgUrl, slug: "initial", rating, genreId, mongoId }, {
                    transaction: t,
                });

                if (casts && casts[0].name) {
                    const createdCast = await Cast.bulkCreate(casts.map(cast => {
                        const { name } = cast

                        return { ...cast, movieId: createdMovie.id };
                    }), {
                        validate: true,
                        transaction: t,
                    });
                }

            });
            // console.log('>>>',createdMovie);

            const description = `New movie with id ${createdMovie.id} has been created`

            res.status(201).json(description)
        } catch (error) {
            next(error)
        }
    }

    static async showMovieById(req, res, next) {
        try {
            const { movieId } = req.params
            const movie = await Movie.findByPk(movieId, {
                include: [Genre, Cast]

            })
            if (!movie) {
                throw { name: '404data not found', message: 'Movie not found' }
            }
            res.status(200).json(movie)
        } catch (error) {

            next(error)
        }
    }

    static async destroyMovie(req, res, next) {
        try {

            const { movieId } = req.params
            const toBeDeleted = await Movie.findByPk(movieId)
            if (!toBeDeleted) {
                throw { name: '404data not found', message: 'Movie not found' }
            } else {
                await toBeDeleted.destroy()
                res.status(200).json({
                    message: "success delete",
                    deleted: toBeDeleted
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async showGenres(req, res, next) {
        try {
            const genre = await Genre.findAll()
            res.status(200).json(genre)

        } catch (error) {
            next(error)
        }
    }

    static async putMovie(req, res, next) {
        try {
            const { movieId } = req.params
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, authorId, casts } = req.body;
            const movie = await Movie.findByPk(movieId)
            if (!movie) {
                throw { name: '404data not found', message: 'Movie not found' }
            }
            await movie.update({ title, synopsis, trailerUrl, imgUrl, rating, genreId })

            const updateMovie = await sequelize.transaction(async (t) => {

                let slug = title.toLowerCase().split(' ').join('-')

                await movie.update({ title, synopsis, trailerUrl, imgUrl, slug, rating, genreId, authorId, mongoId }, {
                    transaction: t,
                });

                await Cast.destroy({ where: { movieId: movie.id } })
                if (casts) {
                   

                    const createdCast = await Cast.bulkCreate(casts.map(cast => {
                        const { name } = cast
                        if (!name) {
                            throw { name: "required", message: "Cast name is required" }
                        }
                        return { name: cast.name, profilePict: cast.profilePict, movieId: movie.id };
                    }), {
                        transaction: t,
                    })
                };


            });

            const description = `Movie with id ${movieId} updated`

            res.status(200).json({ message: description })

        } catch (error) {
            next(error)
        }

    }




    static async createGenre(req, res, next) {
        try {
            const { name } = req.body
            if (!name) {
                throw { name: "required", message: "Genre name is required" }
            }
            const genre = await Genre.create({ name })

            res.status(200).json(genre)
        } catch (error) {
            next(error)
        }
    }

    static async deleteGenre(req, res, next) {
        try {
            const { genreId } = req.params
            const genre = await Genre.findByPk(genreId)
            if (!genre) {
                throw { name: '404data not found', message: 'Genre not found' }
            }

            await genre.destroy()

            res.status(200).json({ message: "Genre success to delete" })

        } catch (error) {
            next(error)
        }
    }

    static async showGenreById(req, res, next) {
        try {
            const { genreId } = req.params
            const genre = await Genre.findByPk(genreId)
            if (!genre) {
                throw { name: '404data not found', message: 'Genre not found' }
            }

            res.status(200).json(genre)

        } catch (error) {
            next(error)
        }
    }

    static async editGenre(req, res, next) {
        try {
            const { genreId } = req.params
            const { name } = req.body

            const genre = await Genre.findByPk(genreId)

            if (!genre) {
                throw { name: '404data not found', message: 'Genre not found' }
            }
            await genre.update({ name })

            const user = await User.findByPk(req.user.id)
            const description = `Genre with id ${genreId} updated`


            res.status(200).json({ message: description })

        } catch (error) {
            next(error)
        }
    }

    static async destroyMovieByMongoId(req, res, next) {
        try {
            const { mongoId } = req.params;
            await Movie.destroy({
                where: {
                    mongoId
                }
            })
            res.status(200).json({ message: `Successfully deleted movies related to user with Id ${mongoId}` });
        } catch (error) {
            next(error);
        }
    }



}


module.exports = Controller