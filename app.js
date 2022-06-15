const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res)=>{

    const country = req.body.country
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=21306af6f55121d066943b31bcd0f4fb`;
    
    https.get(url, (response)=>{
        console.log(response.statusCode);
        response.on('data', (data)=>{
            
            
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            const icon = weather.weather[0].icon
            const icons = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const weatherDesc = weather.weather[0].description;
            res.write(`<p>The weather in ${country} is ${weatherDesc}</p>`);
            res.write(`<h2>The temperature is ${temp}</h2>`);
            res.write(`<img src = ${icons}>`);
            res.send();
            // console.log(weatherDesc);
        })
    })
})

app.listen(port, (req, res) => {
    console.log(`Running on port ${port}`);
})