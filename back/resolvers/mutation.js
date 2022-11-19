const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { AuthenticationError, ForbiddenError } = require('apollo-server-express')
const robohashAvatars = require('robohash-avatars')
require('dotenv').config()

module.exports = {
    signUp: async (parent, { username, email, password }, { models }) => {
        email = email.trim().toLowerCase()
        const hashed = await bcrypt.hash(password, 10)
        const avatar = robohashAvatars.generateAvatar({username: username, height: 200, width: 200})
        try {
            const user = await models.User.create({
                username,
                email,
                avatar,
                password: hashed
            })
            return jwt.sign({id: user._id}, process.env.JWT_SECRET)
        } catch(err) {
            console.log(err)
            throw new Error('Error creating account')
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if(email) {
            email = email.trim().toLowerCase()
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        })
        if(!user) {
            throw new AuthenticationError('User not found')
        }
        const valid = await bcrypt.compare(password, user.password)
        if(!valid) {
            throw new AuthenticationError('Wrong password')
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    },
    newNote: async (parent, args, { models, user }) => {
        //if user not authorized throw error
        if(!user) {
            throw new AuthenticationError('You must be signed in to create a note')
        }
        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        })
    },
    deleteNote: async (parent, { id }, { models, user }) => {
        //if user not authorized throw error
        if(!user) {
            throw new AuthenticationError('You must be signed in to delete a note!')
        }
        //find note
        const note = await models.Note.findById(id)
        //if current user and note owner dont match throw error
        if(note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permission to delete this note!")
        }
        try {
            await note.remove()
            return true
        } catch (err) {
            return false
        }
    },
    updateNote: async (parent, { content, id }, { models, user }) => {
        //if user not authorized throw error
        if(!user) {
            throw new AuthenticationError('You must be signed in to update a note!')
        }
        //find note
        const note = await models.Note.findById(id)
        //if current user and note owner dont match throw error
        if(note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permission to update this note!")
        }
        return await models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        )
    },
    toggleFavorite: async (parent, { id }, { models, user }) => {
        //if user not authorized throw error
        if (!user) {
            throw new AuthenticationError()
        }
        //check if user already added note to favorites
        let noteCheck = await models.Note.findById(id)
        const hasUser = noteCheck.favoritedBy.indexOf(user.id)
        //if user found in list, remove him and decrease count by 1
        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(id, 
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    // set 'new' as 'true' to return updated document
                    new: true
                }
            )
        } else {
            //if user is not found in list, add him and increase count by 1
            return await models.Note.findByIdAndUpdate(id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            )
        }
    }
}