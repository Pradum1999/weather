const express = require('express')
const app = express()
const axios = require('axios')
const bodyParser = new require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set( __dirname + '/index');

app.get('/', function (req, res) {
    res.render('index', { temp: null })
})
app.post('/fetch_data', function (req, res) {
    const cityName = req.body.city
    console.log(cityName)
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=c4a8e68d2067a02f6dcae115fe470aec&units=metric"
    axios.get(url)
        .then(function (response) {
            //handle succes
            let X = response['data']['main']['temp'];
            console.log(X);
            res.render('index', { temp: X })
        })
        .catch(function(error){
            //handle erroe
            console.log(error);
        })
        .finally(function(){
            //always executed
        });

})
app.listen(3000)