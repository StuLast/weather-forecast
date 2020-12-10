const path = require('path');

const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

//Define Paths for express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars and views location
app.set ('view engine', 'hbs');
app.set ('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather Forecast",
        name: "Stu Last"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather - About",
        name: "Stu Last"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Weather - Help",
        name: "Stu Last",
        message:  "This is a help page"
    });
});

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error:  'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return  res.send({
                error
            });
        }

        weather(latitude, longitude, (error, {forecast} = {}) => {
            if(error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast,
                location,
                address: req.query.address
            })
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Weather - Help',
        name: 'Stu Last',
        message:  "Help article not found"
    });
});

app.get('*', (req, res) => {
    res.render('404', {
       title: '404 - page not found',
       name: 'Stu Last',
       message: 'Page not found'
    });
});



app.listen(port, () => {
    console.log(`Server is up on port 3000 ${port}`);
});