const { user } = require("./query");

module.exports = {
    //fetch users' note list
    notes: async (user, args, { models }) => {
        return await models.Note.find({ author: user._id }).sort({ _id: -1 })
    },
    favorites: async (user, args, { models }) => {
        return await models.Note.find({ faviritedBy: user._id }).sort({ _id: -1 })
    }
}