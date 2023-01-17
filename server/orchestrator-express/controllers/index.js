const axios = require("axios");
const redis = require("../config/redisConnect");
const BASE_URL_APP = 'http://localhost:4002'
const BASE_URL_USER = 'http://localhost:4001'


class Controller {

    static async showAllUsers(req, res, next) {
        try {
            const cacheUser = await redis.get("cacheUser");
            if (cacheUser) {
                return res.status(200).json(JSON.parse(cacheUser));
            }
            const { data } = await axios.get(`${BASE_URL_USER}/users`);
            await redis.set("cacheUser", JSON.stringify(data));
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }


    static async register(req, res, next) {
        try {
            const { username, email, role, phoneNumber, password, address } = req.body;
            console.log('>>>>', req.body);
            const { data } = await axios({
                method: "post",
                url: `${BASE_URL_USER}/users/register`,
                data: { username, email, role, phoneNumber, password, address }
            });

            await redis.del("cacheUser");
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async findUserById(req, res, next) {
        try {
            const { id } = req.params
            const { data } = await axios({
                method: "get",
                url: `${BASE_URL_USER}/users/${id}`,
            });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }


    static async deleteUser(req, res, next) {
        try {
            const id = req.params.id;
            const { data } = await axios({
                method: "delete",
                url: `${BASE_URL_USER}/users/${id}`
            })

            await axios({
                method: "delete",
                url: `${BASE_URL_APP}/movies/user/${id}`
            })


            await redis.del("cacheUser");
            await redis.del("cacheMovie");
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }


    static async showAllMovies(req, res, next) {
        try {
            await redis.del('cacheMovie')
            const cacheMovie = await redis.get("cacheMovie");
            if (cacheMovie) {
                return res.status(200).json(JSON.parse(cacheMovie));
            }
            let { data : movies } = await axios.get(`${BASE_URL_APP}/movies`);
            const { data : users } = await axios.get(`${BASE_URL_USER}/users`);

            for (const user of users ){
                movies = movies.map(movie=>{
                    if(movie.mongoId == user["_id"]){
                        movie.User = []
                        movie.User.push(user)
                    }
                    return movie
                })
            }

            await redis.set("cacheMovie", JSON.stringify(movies));
            res.status(200).json(movies);
        } catch (error) {
            next(error);
        }
    }


    static async createMovie(req, res, next) {
        try {
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts } = req.body;
            const { data } = await axios({
                method: "post",
                url: `${BASE_URL_APP}/movies`,
                data: { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts } 
            })
            
            await redis.del("cacheMovie");
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async showMovieById(req, res, next) {
        try {
            const {id} = req.params;
            const { data } = await axios({
                method: "get",
                url: `${BASE_URL_APP}/movies/${id}`
            })
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }


    static async putMovie(req, res, next) {
        try {
            const {id} = req.params;
            const { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts } = req.body;
            const { data } = await axios({
                method: "put",
                url: `${BASE_URL_APP}/movies/${id}`,
                data:  { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts } 
            })

            await redis.del("cacheMovie");
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }


    static async destroyMovie(req, res, next) {
        try {
            const {id} = req.params;
            const { data } = await axios({
                method: "delete",
                url: `${BASE_URL_APP}/movies/${id}`,
            })
            await redis.del("cacheMovie");
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;