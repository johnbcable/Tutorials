import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'

const PORT = process.env.PORT || 3500
const app = express()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true
})

server.applyMiddleware({app})

app.get('/', function(req, res) {
	res.send({hello: 'there'})
})

app.listen(PORT, () => `Listening at http://localhost:${PORT}`)
