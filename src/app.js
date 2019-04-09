const  express = require('express');
const path =require('path');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

/*Define paths*/
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

//const port  = process.env.port || 3000
const port  = process.env.PORT || 3000

//setup handle bars  and view locati
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Joshua Dresner'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Joshua Drenser'
    })
})
app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    res.send({
        products: []
    })
    
})
app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address to get the weather for :)'
        })
    }
    address = req.query.address
    geocode(address, (error, {lat, long, location} ={})=>{
        if(error) {
            return res.send({
                error
            })
        } 
        forecast(lat, long, (error, forecastData) => {
            if (error){
                res.send({
                    error
                }) 
            }
            lat = `Lat: ${lat}`
            long = `Long: ${long}`
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
                lat,
                long,
            })
            })
    })

    
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Joshua Dresner',
        message: 'Hey Im here to help'
    })
})



app.get('/help/*', (req, res)=>{
    res.render('404', {
         title: '404 Help',
         name: 'Joshua Dresner',
         errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 404,
        name: 'Joshua Dresner',
        errorMessage: 'Page Not found.'
        
    })
})



app.listen(port, ()=>{
    console.log('Starting up server on port ' + port);
})