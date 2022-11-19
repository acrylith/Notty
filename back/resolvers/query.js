const models = require('../models')

module.exports = {
    notes: async (parent, args, { models }) => {
        //return all notes
        return await models.Note.find().limit(100)
    },
    note: async (parent, { id }, { models }) => {
        //find note by id
        return await models.Note.findById(id)
    },
    noteFeed: async(parent, { cursor }, { models }) => {
        //returned elements limit
        const limit = 10
        //default value false for hasNextPage
        let hasNextPage = false
        //if there is no cursor, last last few notes will be returned from DB
        let cursorQuery = {}
        if (cursor) {
            cursorQuery = { _id: { $lt: cursor } }
        }
        //finding limit+1 notes and sorting from old to new
        let notes = await models.Note.find(cursorQuery).sort({ _id: -1 }).limit(limit+1)
        //if number of notes bigger than limit, set hasNextPage as true and slice notes to limit
        if (notes.length > limit) {
            hasNextPage = true
            notes = notes.slice(0, -1)
        }
        //Mongo-object ID of last item in list is new cursor now
        const newCursor = notes[notes.length - 1]._id
        return {
            notes,
            cursor: newCursor,
            hasNextPage
        }
    },
    user: async (parent, { username }, { models }) => {
        //find user by name
        return await models.User.findOne({username})
    },
    users: async (parent, args, { models }) => {
        //return all users
        return await models.User.find({}).limit(100)
    },
    me: async (parent, args, { models, user }) => {
        //find user by current user's context
        return await models.User.findById(user.id)
    }
}