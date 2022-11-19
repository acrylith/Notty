const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    type Query {
        notes: [Note!]!
        note(id: ID!): Note!
        noteFeed(cursor: String): NoteFeed
        user(username: String!):
        User users: [User!]!
        me: User!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        avatar: String
        notes: [Note!]!
        favorites: [Note!]!
    }
    type Note {
        id: ID!
        content: String!
        author: User!
        favoriteCount: Int!
        favoritedBy: [User!]
        createdAt: Date!
        updatedAt: Date!
    }
    type NoteFeed {
        notes: [Note!]!
        cursor: String!
        hasNextPage: Boolean!
    }
    type Mutation {
        signUp(username: String!, email: String!, password: String!): String!
        signIn(username: String, email: String, password: String!): String!
        newNote(content: String!): Note!
        updateNote(id: ID!, content: String!): Note!
        deleteNote(id: ID!): Boolean!
        toggleFavorite(id: ID!): Note!
    }
`