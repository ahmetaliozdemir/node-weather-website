const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require('request');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000;
//console.log(__dirname);
//console.log(__filename);
//console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Exspress config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ahmet Ali Özdemir",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ahmet Ali Özdemir",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Ahmet Ali Özdemir",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmet Ali Özdemir",
    error: "Help article not found.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address term",
    });
  }

  geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if (error) {
            return res.send( {error })
        }

        forecast(latitude,longitude,(error,forecastData)=> {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                adress: req.query.address,
                latitude,
                longitude
            })
        })
  });

  
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ahmet Ali Özdemir",
    error: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
