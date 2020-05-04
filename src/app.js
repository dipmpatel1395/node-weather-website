const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirctoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setp handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath) //if we put.hbs into views folder we dont need this 
hbs.registerPartials(partialsPath)

//setup static directiry to server
app.use(express.static(publicDirctoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Dipkumar Patel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name:'Dipkumar Patel'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help ',
        name:'Dipkumar Patel',
        helpText:'This is some helpful text '
    })

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }    
            res.send({
                location : location,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })
    
    
    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'You must provide the search term'
        })
    }
    
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Dipkumar Patel',
        error404:' Help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Dipkumar Patel',
        error404:' Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})