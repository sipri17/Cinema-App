const { redis } = require("../config/redisConnect");
const axios = require('axios')
const BASE_URL_APP = 'http://13.212.52.47:4002'
const BASE_URL_USER = 'http://13.212.52.47:4001'
const { GraphQLError } = require('graphql')




const typeDefs = `
type User {
    _id: String
    email: String
    role: String
    phoneNumber: String
    address: String
    username: String
}    

type Cast {
    id : ID,
    name : String
    profilePict : String
    movieId : ID
}

type Genre {
    name : String
}

type Movie {
    id: ID
    title : String
    slug : String
    synopsis : String
    trailerUrl : String
    imgUrl : String
    rating : Int 
    authorId : Int
    mongoId : String
    Casts : [Cast]
    User : User
    
}



input MovieInput {
    title: String
    synopsis : String
    trailerUrl : String
    imgUrl : String
    rating : Int 
  }

input CastInput {   
    name : String
    profilePict : String
}

type Query {
    showAllMovies : [Movie]
    showMovieById(id :Int) : Movie
}
 
type Mutation{
    createMovie(dataInput :MovieInput, castInput : [CastInput]) : Movie
    putMovie(dataInput :MovieInput, id:Int) : String
    destroyMovie(id :ID) : String

}
`

const resolvers = {
    Query: {
        showAllMovies: async () => {
            try {
                await redis.del('cacheMovie')
                const cacheMovie = await redis.get("cacheMovie");
                if (cacheMovie) {
                    return res.status(200).json(JSON.parse(cacheMovie));
                }
                let { data: movies } = await axios.get(`${BASE_URL_APP}/movies`);
                const { data: users } = await axios.get(`${BASE_URL_USER}/users`);

                for (const user of users) {
                    movies = movies.map(movie => {
                        if (movie.mongoId == user["_id"]) {
                            movie.User = user
                        }
                        return movie
                    })
                }

                await redis.set("cacheMovie", JSON.stringify(movies));
                return movies
            } catch (error) {
                throw new GraphQLError(error);
            }
        },
        showMovieById: async (_, { id }) => {
            try {
                console.log('>>>', id);
                const { data: movie } = await axios({
                    method: "get",
                    url: `${BASE_URL_APP}/movies/${id}`
                })

                const { data: users } = await axios.get(`${BASE_URL_USER}/users`);
                for (const user of users) {
                    if (movie.mongoId == user["_id"]) {
                        console.log('test',user);
                        movie.User = user
                    }
                }
                return movie
            } catch (error) {
                throw new GraphQLError(error);
            }
        }
    },
    Mutation: {
        createMovie: async (_, { dataInput, castInput }) => {
            try {
                const { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, } = dataInput
                const casts = castInput
                const { data } = await axios({
                    method: "post",
                    url: `${BASE_URL_APP}/movies`,
                    data: { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts }
                })

                await redis.del("cacheMovie");
                return data.message
            } catch (error) {
                throw new GraphQLError(error);

            }
        },
        putMovie: async (_, { dataInput, id }) => {
            try {
                const { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts } = dataInput
                const { data } = await axios({
                    method: "put",
                    url: `${BASE_URL_APP}/movies/${id}`,
                    data: { title, synopsis, trailerUrl, imgUrl, rating, genreId, mongoId, casts }
                })

                await redis.del("cacheMovie");
                return data.message
            } catch (error) {
                throw new GraphQLError(error);

            }
        },
        destroyMovie: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "delete",
                    url: `${BASE_URL_APP}/movies/${id}`,
                })

                await redis.del("cacheMovie");
                return data.message
            } catch (error) {
                throw new GraphQLError(error);

            }
        },
    }
}

module.exports = { typeDefs, resolvers }