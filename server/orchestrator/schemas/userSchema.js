const { redis } = require("../config/redisConnect");
const axios = require('axios')
const BASE_URL_APP = 'http://54.254.235.80:4002'
const BASE_URL_USER = 'http://54.254.235.80:4001'
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

input UserInput {
    username: String
    email: String!
    role: String
    phoneNumber: String
    password: String!
    address: String
  }



type Query {
    showAllUsers : [User]
    findUserById(id :String) : User
}
 
type Mutation{
    register(dataInput: UserInput) : String
    delete(id :String) : String

}
`

const resolvers = {
    Query: {
        showAllUsers: async () => {
            try {
                await redis.del('cacheUser')
                const cacheUser = await redis.get("cacheUser");
                if (cacheUser) {
                    return res.status(200).json(JSON.parse(cacheUser));
                }
                const { data } = await axios.get(`${BASE_URL_USER}/users`);
                await redis.set("cacheUser", JSON.stringify(data));
                return data
            } catch (error) {
                console.log(error);
            }
        },
        findUserById: async (_, { id }) => {
            try {

                const { data } = await axios({
                    method: "get",
                    url: `${BASE_URL_USER}/users/${id}`,
                });
                return data
            } catch (error) {
                console.log(error);
            }
        }
    },
    Mutation: {
        register: async (_, { dataInput }) => {
            try {
                const { username, email, role, phoneNumber, password, address } = dataInput;
                const { data } = await axios({
                    method: "post",
                    url: `${BASE_URL_USER}/users/register`,
                    data: { username, email, role, phoneNumber, password, address }
                });

                await redis.del("cacheUser");
                return data.message
            } catch (error) {
                throw new Error(error)
                // throw new GraphQLError(error.response.data.message, {
                //     extensions: { code: error.response.status },
                //   });

            }
        },
        delete: async (_, { id }) => {
            try {
                const { data } = await axios({
                    method: "delete",
                    url: `${BASE_URL_USER}/users/${id}`,
                });

                await axios({
                    method: "delete",
                    url: `${BASE_URL_APP}/movies/user/${id}`
                })

                await redis.del("cacheUser");
                await redis.del("cacheMovie");
                return data.message
            } catch (error) {
                throw new Error(error)
                // throw new GraphQLError(error.response.data.message, {
                //     extensions: { code: error.response.status },
                //   });

            }
        },
    }
}

module.exports = { typeDefs, resolvers }