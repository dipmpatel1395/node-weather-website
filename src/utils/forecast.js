const request = require('request')
const forecast =(lat,long,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=abf4e878b4d25f72126c75ac398c233a&query=' +lat+','+long+'&units=m'
    
    request({url,json:true}, (error,{body})=>{
    if(error){
        callback('Unable to connect weather service!',undefined)
    }else if(body.error){
        callback('Unable to find location',undefined)
    } else{
        callback(undefined,body.current.weather_descriptions[0]+
            '. It is currenty '+body.current.temperature+
            ' degree. However, it feels like '+body.current.feelslike+
            ' degree. Have a Wonderful Day!!' 
        )
    }      
})

}

module.exports = forecast
