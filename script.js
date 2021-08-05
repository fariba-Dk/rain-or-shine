console.log('fariba');

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
    document.querySelector('.city').innerText = '' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;

    document.querySelector('.temp').innerText = Math.round(temp) + '°F';
    document.querySelector('.humidity').innerText =
      'humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText = 'Wind speed: ' + Math.round(speed) + ' m/h';
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
weather.fetchWeather('Venice');

//Notes
/*api.openweathermap.org/data/2.5/weather?q=Denver&appid=74e34e7e5ed57fea63f9a7e20c164a69
  this is what we get in JSON format
  // 20210804195212
// https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=74e34e7e5ed57fea63f9a7e20c164a69


{
  "coord": {
    "lon": -104.9847,
    "lat": 39.7392
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04n"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 295.87,
    "feels_like": 295.27,
    "temp_min": 291.14,
    "temp_max": 299.74,
    "pressure": 1015,
    "humidity": 41
  },
  "visibility": 10000,
  "wind": {
    "speed": 3.34,
    "deg": 73,
    "gust": 5.14
  },
  "clouds": {
    "all": 62
  },
  "dt": 1628131477,
  "sys": {
    "type": 2,
    "id": 2004334,
    "country": "US",
    "sunrise": 1628078519,
    "sunset": 1628129398
  },
  "timezone": -21600,
  "id": 5419384,
  "name": "Denver",
  "cod": 200
}*/
