

app.addEventListener(port, function (){
  console.log('Server is running successfully')
})


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
    document.querySelector('.wind').innerText =
      'Wind speed: ' + Math.round(speed) + ' m/h';
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
weather.fetchWeather('Paris');

