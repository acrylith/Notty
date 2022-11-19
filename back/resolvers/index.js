const Query = require('./query')
const Mutation = require('./mutation')
const { GraphQLDateTime } = require('graphql-scalars')
const Note = require('./note')
const User = require('./user')

module.exports = {
    Query,
    Mutation,
    Date: GraphQLDateTime,
    Note,
    User
}