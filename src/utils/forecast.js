const request = require("request");

const forecast = (latitude, longtude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=444dcda380af32fa8298516af7dd7d85&query=${encodeURI(latitude)},${encodeURI(longtude)}&units=f`;
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
        const weather = body.current;
      callback(undefined,  `${weather.weather_descriptions[0]} It is currently ${(weather.temperature-32)/1.8} degress out. It feels like ${weather.feelslike} degress out. There is a ${weather.precip}% precip.`);
    }
  });
};

module.exports = forecast;
