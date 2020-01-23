const express = require('express'),
app = express(),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
passport = require('passport'),
validator = require('express-validator');



//Middleware
express.static('public');
app.use(morgan('common'));
app.use(bodyParser.json());



app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There is an error!');
});


let movies = [
  {
  id: '0',
  title: 'Avengers',
  description: 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.',
  genre: 'Superhero Films',
  director: 'Joss Whedon',
  year: '2012',
  favorite: 'false'
},
{
  id: '1',
  title: 'Avengers: Age of Ultron',
  description: 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it\'s up to Earth\'s mightiest heroes to stop the villainous Ultron from enacting his terrible plan.',
  genre: 'Superhero Films',
  director: 'Joss Whedon',
  year: '2015',
  favorite: 'false'
},
{
  id: '2',
  title: 'Avengers: Infinity War',
  description: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
  genre: 'Superhero Films',
  director: 'Anthony Russo, Joe Russo',
  year: '2018',
  favorite: 'false'
},
{
  id: '3',
  title: 'Avengers: Endgame',
  description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
  genre: 'Superhero Films',
  director: 'Anthony Russo, Joe Russo',
  year: '2019',
  favorite: 'false'
},
{
  id: '4',
  title: 'The Departed',
  description: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
  genre: 'Crime, Thriller',
  director: 'Martin Scorses',
  year: '2006',
  favorite: 'false'
},
{
  id: '5',
  title: 'Get Out',
  description: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
  genre: 'Thriller',
  director: 'Jordan Peele',
  year: '2017',
  favorite: 'false'
},
{
  id: '6',
  title: 'The Dark Knight',
  description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
  genre: 'Action, Crime, Thriller, Superhero Films',
  director: 'Christopher Nolan',
  year: '2008',
  favorite: 'false'
},
{
  id: '7',
  title: 'The Dark Knight Rises',
  description: 'Eight years after the Joker\'s reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.',
  genre: 'Action, Crime, Thriller, Superhero Films',
  director: 'Christopher Nolan',
  year: '2012',
  favorite: 'false'
},
{
  id: '8',
  title: 'John Wick 3',
  description: 'John Wick is on the run after killing a member of the international assassin\'s guild, and with a $14 million price tag on his head, he is the target of hit men and women everywhere.',
  genre: 'Action, Crime, Thriller',
  director: 'Chad Stahelsi',
  year: '2019',
  favorite: 'false'
},
{
  id: '9',
  title: 'The Hangover',
  description: 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.',
  genre: 'Comedy',
  director: 'Todd Phillips',
  year: '2009',
  favorite: 'false'
}];

let genres = [
{
  name: 'Superhero Films',
  description: 'A superhero film, superhero movie or superhero motion picture is a film that is focused on the actions of one or more superheroes: individuals who usually possess superhuman abilities relative to a normal person and are dedicated to protecting the public.'
},
{
  name: 'Comedy',
  description: 'Comedy Films are \"make \'em laugh\" films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters. Comedies observe the deficiencies, foibles, and frustrations of life, providing merriment and a momentary escape from day-to-day life. They usually have happy endings, although the humor may have a serious or pessimistic side.'
},
{
  name: 'Action',
  description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases.'
},
{
  name: 'Thriller',
  description: 'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
},
{
  name: 'Crime',
  description: 'Crime film is a genre that revolves around the action of a criminal mastermind. A Crime film will often revolve around the criminal himself, chronicling his rise and fall. ... This genre tends to be fast paced with an air of mystery – this mystery can come from the plot or from the characters themselves.'
}];

let directors = [
{
  name:'Martin Scorsese',
  bio:'Martin Scorsese was born on...',
  born: 'November 17, 1942 in Queens, New York City, New  York, USA'
},
{
  name:'Christopher Nolan',
  bio:'Christopher Nolan was born on...',
  born: 'July 30, 1970 in London, England, UK'
},
{
  name:'Joss Whedon',
  bio:'Joss Whedon was born on...',
  born: 'June 23, 1964 in New York CIty, New York, USA'
}
];


let users = [
{
  id: '0',
  name: 'John',
  username: 'username',
  password: 'password',
  email: 'example@gmail.com',
  favorites: []
  },
{
  id: '1',
  name: 'Jane',
  username: 'username2',
  password: 'password',
  email: 'example2@gmail.com',
  favorites: []
}];


express.static('public');

// Request Routes

app.get('/', (req, res) => {
  res.send('Hello welcome to my page!')
});

// Get the list of data about all movies

app.get('/movies', (req, res) => {
  res.json(movies)
});

// Get the data about a single movie by title


app.get('/movies/:title', (req, res) => {
  res.json(movies.find( (movie) => { return movie.title.toLowerCase().includes(req.params.title.toLowerCase()); }));
});


// get list of all genres
app.get('/genres', (req, res) => {
  res.json(genres)
});

// get the data about a single genre by name

app.get('/genres/:name', (req, res) => {
  res.json(genres.find( (genre) => { return genre.name === req.params.name; }));
});

// get list of all directors
app.get('/directors', (req, res) => {
  res.json(directors)
});

// get the data about a single director by name

app.get('/directors/:name', (req, res) => {
  res.json(directors.find( (director) => { return director.name === req.params.name; }));
});

// get a list of all users
app.get('/users', (req, res) => {
  res.json(users);
});

// add data for a new user

app.post('/users', (req, res) =>{
let newUser = req.body;

if (!newUser.name){
  const message = 'Please enter a username';
  res.status(400).send(message);
  }
  else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});


// Delete a user by username



app.delete('/users/:username', (req, res) => {
  let user = users.find((user) => { return user.username === req.params.username; });

  if (user) {
    users = users.filter(function(obj) { return obj.username !== req.params.username; });
    res.status(201).send('User ' + user.name + ' with username ' + req.params.username + ' was deleted.')
  }
});

  //update the info of a user by their username



  app.put('/users/:username', (req, res) => {
    let user = users.find((user) => { return user.username === req.params.username; });
    let newUserInfo = req.body;

    if (user && newUserInfo) {
      // preserve the user id
      newUserInfo.id = user.id;
      // preserve the user favorites
      newUserInfo.favorites = user.favorites;
      // merge old info and new info (TODO: validate new info)
      Object.assign(user, newUserInfo);
      // merge user with update info into the list of Users
      users = users.map((user) => (user.username === newUserInfo.username) ? newUserInfo : user);
      res.status(201).send('Info for username ' + req.params.username + ' has been updated');
    } else if (!newUserInfo.name) {
      const message = 'Missing name in request body';
      res.status(400).send(message);
    } else {
      res.status(404).send('User with username ' + req.params.username + ' was not found.');
    }
  });




// adds a movie to the favorites list of a user


app.post('/users/:id/:movie_id', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id; });
  let movie = movies.find((movie) => { return movie.id === req.params.movie_id; });

  if (user && movie) {
    user.favorites = [...new Set([...user.favorites, req.params.movie_id])];
    res.status(201).send('Movie with ID ' + req.params.movie_id + ' was added to the favorites list of User with ID ' + req.params.id);
  } else if (!movie) {
    res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
  } else {
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  }
});



// removes a movie from the favorites list of a user


app.delete('/users/:id/:movie_id', (req, res) => {
  let user = users.find((user) => { return user.id === req.params.id; });
  let movie = movies.find((movie) => { return movie.id === req.params.movie_id; });

  if (user && movie) {
    user.favorites = user.favorites.filter((movie_id) => { return movie_id !== req.params.movie_id; });
    res.status(201).send(user);
  } else if (!movie) {
    res.status(404).send('Movie with id ' + req.params.movie_id + ' was not found.');
  } else {
    res.status(404).send('User with id ' + req.params.id + ' was not found.');
  }
});







app.listen(3000, ()=> {
  console.log('Your app is listening on port 3000')
});
