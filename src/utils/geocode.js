var request = require('request');

//MapBox Api

const geocode = (address, callback) => {
	const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1Ijoic2FnYXI1N3BhdGlsNTciLCJhIjoiY2p0cXNocXBrMGRlbzQ0bXIyN2w5cmNiOCJ9.OOsbhyNqD2mdwqDZmmGnNw';

	request({ url : geocodeURL, json: true }, (error, response) => {
	//const data = JSON.parse(response);
	const farr = response.body.features;
	if(error){
		console.log('error connecting');
	}
	else if(farr.length === 0) {
		console.log('No such data');
	}	
	else {
		callback(undefined, {
			latitude : response.body.features[0].center[1],
			longitude : response.body.features[0].center[0],
			location : response.body.features[0].place_name
		})
	}
});

}

module.exports = geocode;