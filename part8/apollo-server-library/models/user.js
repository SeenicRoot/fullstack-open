const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3.
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
})

schema.plugin(require('mongoose-unique-validator'))
module.exports = mongoose.model('User', schema)