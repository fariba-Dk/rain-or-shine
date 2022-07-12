//function fetchWeather calls takes a city and fetches from the api
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
//this function takes the data and
  displayWeather: function ( data ) {
    //destructure name from the object
    const { name } = data;
    const { icon, description } = data.weather[0]; //first element of data.weather object. weather is an arr so we do arr[0]
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector('.city').innerText = 'Weather in ' + name; //.city bc its a class
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '@2x.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = Math.round(temp) + '°F';
    document.querySelector('.humidity').innerText =
      'humidity: ' + humidity + '%';
    let wind = document.querySelector('.wind').innerText =
      'Wind:' + ' ' + Math.round( speed ) + ' m/h';
    console.log(wind)
    if ( wind.length = 1){
      wind = ' wind'
    }
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')"; //IF YOU WANTED THAT PARTICULAR CITY
  },
  //search function gets the content of the search-bar and takes the value and
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};
  document.querySelector('.search button').addEventListener('click', function () {
  weather.search();//we call on search() to get contnet of fetched info
});

  document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });
weather.fetchWeather('Tokyo');
