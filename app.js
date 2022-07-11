const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");

var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
ejs.open = "{{";
ejs.close = "}}";
require("dotenv").config();

app.use(express.static("public"));
app.set("views", "./bind");
app.set("view engine", "ejs");

var API_SERVER = process.env.API_SERVER;

var dataPostAll;
var dataKategoriAll;
var dataKategoriPost;
var dataRecentPost;

app.get("/", (req, res) => {
  getDataPostAll();
  getDataKategoriAll();
  getRecentPost();
  let dr = { 
    judul: "Rumah ADA - ADA Info Community", 
    api: API_SERVER, 
    dataPost : dataPostAll, 
    dataKategori : dataKategoriAll,
    dataRecentPost : dataRecentPost
  };
  res.render("home", dr);
});

app.get("/:slug", (req, res) => {
  let slug = req.params.slug;
  let dr = {
    slug: slug,
    judul: "Rumah ADA - ADA Info Community",
    api: API_SERVER,
  };
  res.render("blog/single-post", dr);
});

app.get("/category/:slug", (req, res) => {
  let slug = req.params.slug;
  getDataKategoriPost(slug);
  console.log("Haloo");
  // res.render("blog/kategori-post");
});

async function getDataKategoriPost(slug)
{
  let res = await axios.get(API_SERVER+"kategori/"+slug);

}

async function getRecentPost()
{
  let res = await axios.get(API_SERVER+"post/recent");
  dataRecentPost = res.data.dataPost;
}

async function getDataKategoriAll()
{
  let res = await axios.get(API_SERVER+"kategori/data/all");
  dataKategoriAll = res.data.kategori;
}

async function getDataPostAll() {
  let res = await axios.get(API_SERVER+"post/data/all");
  dataPostAll = res.data.post;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
