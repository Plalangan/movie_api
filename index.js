const express = require('express'),
app = express(),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');


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
  description: 'Comedy Films are "make \'em laugh" films designed to elicit laughter from the audience. Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment. The comedy genre humorously exaggerates the situation, the language, action, and characters. Comedies observe the deficiencies, foibles, and frustrations of life, providing merriment and a momentary escape from day-to-day life. They usually have happy endings, although the humor may have a serious or pessimistic side.'
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
}

];

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
  id: 0,
  name: 'John',
  username: 'username',
  password: 'password',
  email: 'example@gmail.com'
}
]


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

app.get('/movies/:title', (req, res) =>
{
  res.json(movies.find( (movie) =>
  { return movie.title === req.params.title }));
});

// get the data about a single genre by name

app.get('/genres/:name', (req, res) =>
{
  res.json(Genres.find( (genre) =>
{ return genre.name === req.params.name}))
});

// get the data about a single director by name

app.get('/directors/:name', (req, res) => {
  res.json(directors.find( (director) => {
    return director.name === req.params.name;  }))
});

// add data for a new user

app.post('/users/:id', (req, res) =>{
let newUser = req.body;

if (!newUser.name){
  const message = 'Please enter a username';
  res.status(400).send(message);
  }
  else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
  }
});

// Delete a user by ID

app.delete('/users/:id', (req, res) => {
  let user = Users.find((user)=> {
    return student.id === req.params.id });
    if (user){
      Users.filter(function(obj) { return obj.id !== req.params.id });
      res.status(201).send("User" + req.params.id + "was deleted.")
    }
  });




app.use(morgan('common'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There is an error!');
});
