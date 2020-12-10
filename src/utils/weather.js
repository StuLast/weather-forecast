const request = require("postman-request");

const weather = (latitude, longitude, callback) => {
    const weather_api_token = "0755e5f1e238db7275f628ab1409f59e"
    const url = `http://api.weatherstack.com/current?access_key=${weather_api_token}&query=${latitude},${longitude}&units=f`;
    console.log(url);
    request({url, json: true}, (err, { body } = {}) => {
        if(err) {
            callback("Unable to reach weather server.", undefined);
        } else if (body.error) {
            callback("Unable for find weather for that location", undefined)
        } else {
            const {temperature, feelslike, weather_descriptions:description} = body.current;
            callback(undefined, {
                forecast: `It's ${description[0]}. It is currently ${temperature} degrees F out.  It feels like ${feelslike} degrees F out. `,
            });
        }
    })
};

module.exports = weather;