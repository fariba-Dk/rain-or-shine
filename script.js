// const express = require('express');
// const path = require('path');
// const PORT = process.env.PORT || 5000;

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

let weather = {
  apiKey: '74e34e7e5ed57fea63f9a7e20c164a69',
  fetchWeather: function (city) {
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=imperial&appid=' +
        this.apiKey
    ) //once fetch the url then it response with data
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0]; //weather is an arr so we do arr[0]
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '@2x.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = Math.round(temp) + '°F';
    document.querySelector('.humidity').innerText =
      'humidity ' + humidity + '%';
    document.querySelector('.wind').innerText =
      'Wind' + Math.round(speed) + ' m/h';
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')"; //IF YOU WANTED THAT PARTICULAR CITY
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};
  document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});

  document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });
weather.fetchWeather('London');
