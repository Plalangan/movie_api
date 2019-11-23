const express = require('express'),
app = express(),
morgan = require('morgan');

let topmovies = [{
  title: 'Avengers'
},
{
  title: 'Avengers: Age of Ultron'
},
{
  title: 'Avengers: Infinity War'
},
{
  title: 'Avengers: Endgame'
},
{
  title: 'The Departed'
},
{
  title: 'Batman Begins'
},
{
  title: 'The Dark Knight'
},
{
  title: 'The Dark Knight Rises'
},
{
  title: 'Thor: Ragnarok'
},
{
  title: 'Captain America: Civil War'
}];

express.static('public');

app.get('/movies', function(req, res) {
  res.json(topmovies)
});

app.get('/', function(req, res){
  res.send('Hello welcome to my page!')
});


app.use(morgan('common'));

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('There is an error!');
});
