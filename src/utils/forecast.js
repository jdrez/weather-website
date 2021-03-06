const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9ed2f40e63f1d92f21cb54d351ac551f/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. \n The high today is '+ body.daily.data[0].temperatureHigh+' with a low of ' + body.daily.data[0].temperatureLow +'. There is a '+ body.currently.precipProbability + '% chance of rain.')
        }
    })
}


module.exports = forecast