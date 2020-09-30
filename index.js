const express = require('express'),

// just some more testing
app = express();
cors = require('cors');
app.use(cors());
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
path = require("path");

passport = require('passport');
require('./passport.js');
const {check, validationResult} = require('express-validator');


//Middleware
app.use(express.static('public'));
app.use("/client", express.static(path.join(__dirname, "client", "dist")));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(morgan('common'));
app.use(bodyParser.json());

let auth = require('./auth.js')(app);

const mongoose = require('mongoose'),
models = require('./models.js'),
Movies = models.Movie,
Users = models.User,
Genres = models.Genre;

//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});
mongoose.connect( 'mongodb+srv://plalangan:Infiniti727@cluster0-koyhm.mongodb.net/myFlixDB?retryWrites=true&w=majority' , {useNewUrlParser: true});




var allowedOrigins = ['http://localhost:3000', 'https://myflixdb-pl.herokuapp.com/','http://localhost:1234',];

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




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There is an error!');
});


express.static('public');

// Request Routes

app.get('/', (req, res) => {
  res.send('Hello welcome to my page!')
});

// Get the list of data about all movies

app.get('/movies',  (req, res) => {
  Movies.find()
  .then(movies => {
    res.status(201).json(movies)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get the data about a single movie by title


app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title})
  .then(movie => {
    res.json(movie)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// get list of all genres

app.get('/movies/genres',  (req, res) => {
  Genres.find()
  .then(genres =>{
    res.status(201).json(genres)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


// get the data about a single genre by name

app.get('/movies/genres/:Name', (req, res) => {
  Movies.findOne({ "Genre.Name" : req.params.Name})
  .then(movie => {
    res.status(201).json(movie.Genre)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});


// get a list of all directors

app.get('/movies/directors',  (req, res) => {
  Directors.find()
  .then(directors => {
    res.status(201).json(directors)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err)
  });
});

// get the data about a single director by name

app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({ "Director.Name" : req.params.Name})
.then(movie => {
  res.status(201).json(movie.Director)
})
.catch(err => {
  console.error(err);
  res.status(500).send("Error: " + err)
});
});

// get a list of all users
app.get('/users',  passport.authenticate('jwt', { session: false}), (req, res) =>  {

  Users.find()
  .then(users =>  {
    res.status(201).json(users)
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// get info about a single user
app.get('/users/:Username', /*passport.authenticate('jwt', { session: false}), */(req,res) => {
  Users.findOne({ Username : req.params.Username})
  .then(user => {
    res.json(user)
    console.log('failed')
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});




// get info of user by username

// add data for a new user

app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ], (req, res) => {

  // check the validation object for errors
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          //If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + ' already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => { res.status(201).json(user) })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });
// Delete a user by username



app.delete('/users/:Username'/ passport.authenticate('jwt', { session: false}), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

  //update the info of a user by their username



  app.put('/users/:Username',  passport.authenticate('jwt', { session: false}), (req, res) => {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Name: req.body.Name,
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});




// adds a movie to the favorites list of a user


app.post('/users/:Username/movies/:MovieID', /*passport.authenticate('jwt', { session: false}),*/ (req, res)  => {
  Users.findOneAndUpdate({ Username : req.params.Username }, 
    { $push : { FavoriteMovies : req.params.MovieID }},
  { new : true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});


// removes a movie from the favorites list of a user


app.delete('/users/:Username/movies/:MovieID',/* passport.authenticate('jwt', { session: false}), */(req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    { $pull: {FavoriteMovies: req.params.MovieID}},
    { new: true},
    (err, updatedUser) => {
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
