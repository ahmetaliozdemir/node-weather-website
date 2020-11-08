const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibXVtaW5qYWNrIiwiYSI6ImNraDV2bHdmbTA3YmUycnFjMWVoZWdwN2IifQ.PKT6UW9QOVMOSJBRZqb5hw`;
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to geo service!", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find location", undefined);
      } else {
        const data = {
          latitude: response.body.features[0].center[0],
          longitude: response.body.features[1].center[1],
          location: response.body.features[0].place_name,
        };
        callback(undefined, data);
      }
    });
  };

  module.exports = geocode;

  
