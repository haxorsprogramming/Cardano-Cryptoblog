const express = require('express');
const app = express();
const port = 3000;
var http = require('http');
var fs = require('fs');
var ejs = require('ejs'); 
ejs.open = '{{'; 
ejs.close = '}}';

app.use(express.static('public'));
app.set('views', './bind');
app.set('view engine', 'ejs');

// halaman home 
app.get('/', (req, res) => {
  let dr = { judul: 'Ada Indonesia - ADA Info Community' }
  res.render('home', dr);
});

// halaman blog 
app.get('/:slug', (req, res) => {
  let slug = req.params.slug;
  res.render('blog/single-post');
});

// halaman kategori 
app.get('/category/:slug', (req, res) => {
  let slug = req.params.slug;
  res.render('blog/single-post');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});