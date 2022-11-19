module.exports = {
    //fetch author of note
    author: async (note, args, { models }) => {
        return await models.User.findById(note.author)
    },
    //fetch fvoritedBy list
    favoritedBy: async(note, args, { models }) => {
        return await models.User.find({ _id: { $in: note.favoritedBy } })
    }
}