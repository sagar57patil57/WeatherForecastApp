const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
var geocode = require('./utils/geocode');
var forecast = require('./utils/forecast');

app.set('view engine', 'hbs');
const publicDirPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');
//app.set('views', path.join(__dirname, '../views'));

app.use(express.static(publicDirPath));
hbs.registerPartials(partialsPath);

app.get('/',(req, res)=>{
	res.render('index',{
		name: 'sagar'
	});
});

app.get('/weather',(req, res)=>{
	
	if(!req.query.address){
		return res.send({
			error: 'No address'
		})
	}
	geocode(req.query.address, (err, { latitude, longitude, location } = {})=>{

	if(err){
		return res.send({
			error: err
		})
	}

	else{
		forecast(latitude,longitude,(err, fcdata)=>{
		res.send({
		forecast: fcdata.summary,
		location: location,
		address: req.query.address,
		dewPoint: fcdata.dewPoint,
		humidity: fcdata.humidity,
		windSpeed: fcdata.windSpeed,
		temp: fcdata.temp
	});
		});
	}
	});

		
	}
);

app.get('/about',(req, res)=>{
	res.render('about',{
		name: 'about'
	});
});

app.get('/help',(req, res)=>{
	res.render('help',{
		name: 'help'
	});
});

app.get('*',(req, res)=>{
	res.send('404 page');
});

app.listen(3000,()=>{
	console.log('Connected to port 3000');
});