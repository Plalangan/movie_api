const mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  Title: {type: String, required: true},
  Description: {type: String, required: true},
  Genre: {
    Name: String,
    Description: String
  },
  Director: {
    Name: String,
    Bio: String,
    Born: String
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean
});

const bcryptjs = require('bcryptjs');

var userSchema = mongoose.Schema({
  Name: {type: String, required: true},
  Username: {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Birthday: Date,
  Favorites: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Movie'}]
});

userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};


var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
