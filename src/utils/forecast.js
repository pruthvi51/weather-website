const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=f364783427b9ec8f7aeaea576b9d8c76&query='+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'&units=m'
    request({ url:weatherUrl,json: true }, (error, {body}) => {
        //console.log(weatherUrl)
        if(error) {
            callback('Unable to connect to weather service :\'(', undefined)
        }
        else if(body.error) {
            callback('Unable to find the location', undefined)
        }
        else{   
            callback(undefined,'it\'s '+body.current.temperature+' celsius and rain forecast is ' +body.current.precip+'%')
        }
    })
}

module.exports = forecast