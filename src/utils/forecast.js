var request = require('request');

const forecast = (lat, long, callback) => {
	//DarkSky Api
	const url = 'https://api.darksky.net/forecast/981057f168d6cac4114174cb5e2128da/' + lat + ',' + long;

	request({ url : url }, (error, response) => {
		if(error){
			console.log('error connecting');
		}
		else if(response.body.error) {
			console.log(response.body.error);
		}	
		else {
			const data = JSON.parse(response.body);
			console.log(data.currently.temperature)
			callback(undefined, {
				summary : data.daily.data[0].summary,
				dewPoint : data.daily.data[0].dewPoint,
				humidity : data.daily.data[0].humidity,
				windSpeed : data.daily.data[0].windSpeed,
				temp : data.currently.temperature
			});
		}
	});
}

module.exports = forecast;