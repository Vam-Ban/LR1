const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    login: {type: String, require: true},
    date: {type: String, default: Date.now},
    friends: [{type: Types.ObjesctId, ref: 'Friend'}]
})

module.exports = model('User', schema)