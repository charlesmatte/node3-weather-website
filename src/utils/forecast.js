const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6f59d0345bfac7bb0fd797f0e941f65c&query=${latitude},${longitude}&units=m`
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Cannot find requested location', undefined)
        } else { 
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The wind blows at a speed of ${body.current.wind_speed} km/h towards the ${body.current.wind_dir}.`)
        }
    })
}

module.exports = forecast