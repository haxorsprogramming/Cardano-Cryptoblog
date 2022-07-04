const express = require('express');
const app = express();
const port = 3000;
var http = require('http');
var fs = require('fs');
var ejs = require('ejs'); 
ejs.open = '{{'; 
ejs.close = '}}';
require('dotenv').config();

app.use(express.static('public'));
app.set('views', './bind');
app.set('view engine', 'ejs');

var API_SERVER = process.env.API_SERVER;

// halaman home 
app.get('/', (req, res) => {
  let dr = { judul: 'Rumah ADA - ADA Info Community' , api : API_SERVER}
  res.render('home', dr);
});

// halaman blog 
app.get('/:slug', (req, res) => {
  let slug = req.params.slug;
  let dr = {'slug':slug, judul: 'Rumah ADA - ADA Info Community', api : API_SERVER}
  res.render('blog/single-post', dr);
});

// halaman kategori 
app.get('/category/:slug', (req, res) => {
  let slug = req.params.slug;
  res.render('blog/single-post');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});