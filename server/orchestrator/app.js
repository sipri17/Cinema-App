if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const {ApolloServer} = require('@apollo/server')
const {startStandaloneServer} = require('@apollo/server/standalone')
const movieSchema = require('./schemas/movieSchema')
const userSchema = require('./schemas/userSchema')



const server = new ApolloServer({
    typeDefs:[userSchema.typeDefs,movieSchema.typeDefs],
    resolvers:[userSchema.resolvers,movieSchema.resolvers]
})

startStandaloneServer(server,{
    listen :{ port: 4000 }
})
.then(({url})=>{
    console.log(`Server ready at : ${url}`);
})
.catch(console.log)
      