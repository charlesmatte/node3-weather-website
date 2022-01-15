const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Charles Matte'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Charles Matte'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Call if you need help.',
        name: 'Charles Matte'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You need to provide a city!'
        })
    }

    const city = req.query.city

    geocode(city, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            return res.send({
                forecast: forecastData,
                location,
                city: req.query.city
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
         return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send( {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Charles Matte'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Charles Matte'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})