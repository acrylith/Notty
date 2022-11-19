require('dotenv').config()
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const models = require('./models')
const db = require('./db')
const resolvers = require('./resolvers')
const DB_HOST = process.env.DB_HOST
const port = process.env.PORT || 4000
const jwt = require('jsonwebtoken')
const helmet = require('helmet')
const cors = require('cors')
const depthLimit = require('graphql-depth-limit')
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const getUser = (token) => {
    if(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET)
        } catch (err) {
            new Error('Session invalid')
        }
    }
}

const app = express()
// app.use(helmet())
app.use(cors())
db.connect(DB_HOST)
let apolloServer = null
async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
        context: ({ req }) => {
            //getting user token from header
            const token = req.headers.authorization
            //extracting user with token
            const user = getUser(token)
            return { models, user }
        },
        playground: true
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app, path: '/api'})
}
startServer()
app.get('/', (req, res) => res.send('Hello, world!'));
app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}`))