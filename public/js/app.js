console.log('hi');

var weatherForm = document.querySelector('form');
var search = document.querySelector('input');
var summary = document.querySelector('#summary');
var locationtoshow = document.querySelector('#location');
var temprt = document.querySelector('#temprt');
var windspeed = document.querySelector('#windspeed');
var dew = document.querySelector('#dew');
var humidity = document.querySelector('#humidity');

weatherForm.addEventListener('submit',(e)=>{

	//summary.textContent = 'Loading...';
	summary.innerHTML = '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div>';

	temprt.textContent='';
	locationtoshow.textContent = '';
	dew.textContent = '';
	humidity.textContent = '';
	windspeed.textContent = '';

	e.preventDefault();
	var location = search.value;

	console.log(location);

	fetch('http://localhost:3000/weather?address='+location).then((res)=>{
	res.json().then((data)=>{

		if(data.error)
		{
			console.log('error!!!');
			summary.textContent = data.error;
		}
		else
		{
			var tempInCel = ((data.temp-32)*5)/9;
			var ans = tempInCel.toPrecision(2)
			temprt.textContent = ans+' Deg Celcius';
			temprt.style.fontSize = '30px';
			temprt.style.fontWeight = 'bold';

			locationtoshow.textContent = 'LOCATION : ' + data.location;
			dew.textContent = 'DEW : ' + data.dewPoint;
			humidity.textContent = 'HUMIDITY : ' + data.humidity;
			windspeed.textContent = 'WINDSPEED : ' + data.windSpeed;
			summary.innerHTML = 'SUMMARY : ' + data.forecast;
			//console.log(data.location);
			//console.log(data.forecast);
			//console.log(data.humidity);
			//console.log(data.temp);
		}

	})
});

});