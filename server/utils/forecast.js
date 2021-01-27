const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const darkskyUrl =
    "https://api.darksky.net/forecast/4677d5b8101e8cd3ed984f31ac54d3a9/" +
    latitude +
    "," +
    longitude;

  request({ url: darkskyUrl, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      console.log(response);
      callback(
        undefined,
        response.body.daily.data[0].summary +
          " It is currently " +
          response.body.currently.temperature +
          " degress out. There is a " +
          response.body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};
module.exports = forecast;
