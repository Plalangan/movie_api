const express = require('express'),
app = express(),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
cors = require('cors');
passport = require('passport');
require('./passport.js');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose'),
models = require('./models.js'),
Movies = models.Movie,
Users = models.User;

//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});
mongoose.connect( process.env.CONNECTION_URI, {useNewUrlParser: true});


//Middleware
express.static('public');
app.use(morgan('common'));
app.use(bodyParser.json());
var auth = require('./auth.js')(app);



var allowedOrigins = ['http://localhost:3000', 'https://myflixdb-pl.herokuapp.com/'];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There is an error!');
});


express.static('public');

// Request Routes

app.get('/', (req, res) => {
  res.send('Hello welcome to my page!')
});

// Get the list of data about all movies

app.get('/movies', function(req, res) {
  Movies.find()
  .then(function(movies){
    res.status(201).json(movies)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get the data about a single movie by title


app.get('/movies/:Title', function(req, res){
  Movies.findOne({ Title: req.params.Title})
  .then(function(movie){
    res.json(movie)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// get the data about a single genre by name

app.get('/movies/genres/:Name', function (req, res){
  Movies.findOne({ "Genre.Name" : req.params.Name})
  .then(function(movie){
    res.status(201).json(movie.Genre)
  })
  .catch(function(err){
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});


// get the data about a single director by name

app.get('/movies/directors/:Name', function (req, res){
  Movies.findOne({ "Director.Name" : req.params.Name})
.then(function(movie){
  res.status(201).json(movie.Director)
})
.catch(function(err){
  console.error(err);
  res.status(500).send("Error: " + err)
});
});

// get a list of all users
app.get('/users', passport.authenticate('jwt', { session: false}), function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// get info of user by username

// add data for a new user

app.post('/users',
//Validation logic
[check('Username', 'Username is required').isLength({min: 5}),
check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
check('Password', 'Password is required').not().isEmpty(),
check('Email', 'Email does not appear to be valid').isEmail()],

//
function(req, res) {
  var errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Name: req.body.Name,
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});


// Delete a user by username



app.delete('/users/:Username', passport.authenticate('jwt', { session: false}), function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

  //update the info of a user by their username



  app.put('/users/:Username', passport.authenticate('jwt', { session: false}), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Name: req.body.Name,
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});




// adds a movie to the favorites list of a user


app.post('/users/:Username/Movies/:MovieID', passport.authenticate('jwt', { session: false}), function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { Favorites : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});


// removes a movie from the favorites list of a user


app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false}), function(req, res){
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: {Favorites: req.params.MovieID}},
    { new: true},
    function(err, updatedUser){
      if (err){
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser)
      }
    })});






var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", ()=> {
  console.log('Your app is listening on port 3000')
});
