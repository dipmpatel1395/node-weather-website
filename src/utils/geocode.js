const request = require('request')
const geocode =(address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGlwbXBhdGVsMTM5NSIsImEiOiJjazlrcml2bXIwNWJwM2RvYjY5bjBzdGpoIn0.msqnXaSSRP2T2h5rJFq8fw&limit=1'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connct to location services! ',undefined)
           }else if(body.features.length===0){
                callback('Location not found try another one',undefined)
            }else {
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location:body.features[0].place_name
                })
            }
    })
}

module.exports = geocode