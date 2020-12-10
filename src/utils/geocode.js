const request = require('postman-request')

const geocode = (location, callback) => {
    const api_token = "pk.eyJ1Ijoic3R1bGFzdCIsImEiOiJja2kzazlkOHkwMWQzMnlzNHFpOGphMDBuIn0.8jII7Y9UkCwCyKPFlZtUww";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${api_token}&limit=1`;
    request({url, json:true}, (err, {body} = {}) => {
        if(err) {
            callback("Unable to connect to geocoding server.", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location.  Try another place.", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;