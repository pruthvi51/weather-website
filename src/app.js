const express = require('express')
const hbs = require('hbs')
const path = require('path')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup static directory
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        name: 'pruthvi',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'pruthvi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help page',
        name: 'pruthvi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location) {
        return res.send({
            error: 'Address not provided'
        })
    }

    const location = req.query.location
    geocode(location, (error, {latitude, longitude, address} = {}) => {
        if(error) {
            return res.send({
                error: 'there was an error'
            })
        }
        else{
            forecast(latitude, longitude, (error, forecast) => {
                if(error) {
                    return res.send({
                        error: 'there was an error'
                    })
                }
                else{
                    res.send({
                        address: address,
                        forecast: forecast,
                        location: location
                    })
                }
            })
        }
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'help article not found',
        name: 'pruthvi'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
        name: 'pruthvi'
    })
})

app.listen(3000, () => {
    console.log('server running!')
})

