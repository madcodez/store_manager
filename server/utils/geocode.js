const request = require('request');


const geocode = (address, callback) => {
    const mapboxUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibS1jb2R5IiwiYSI6ImNrNzVubHdmZTB4YjEzZXQwYXQ4OW52Y3gifQ.LMsWdnzB6nm4i9W3BUsgyg&limit=1";

    request({ url: mapboxUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service');
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode;