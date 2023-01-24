//require express
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//Handle Get request
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

//Handle Post request
app.post("/", function (req, res) {

  const query = req.body.cityName;
  const apiKey = "0b76165e8fd855927982e79cc6d94b2";
  const unit = "metric";

  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=6" +
    apiKey +
    "&units=" +
    unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      //Fetch temp from JSON
      const temp = weatherData.main.temp;
      //Fetch temp from JSON
      const weatherDescription = weatherData.weather[0].description;
      //Fetch conditional Icon
      const icon = weatherData.weather[0].icon;
      console.log("Id Icon = " + icon);
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write(
        "<h1>The temperature in " + query + " is " + temp + "Celsius.</h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});
