const express = require('express');
const app = express();
const port = 3000;
var http = require('http');
var fs = require('fs');

app.use(express.static('public'));
app.set('views', './bind');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let dr = { judul: 'Cardano In Indonesia' }
    res.render('home', dr);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})