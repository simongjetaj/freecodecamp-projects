// locating you
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeather(lat, lon);
  });
} else {
  alert("Sorry, Geolocation is not supported by this browser.");
}

// getting the weather data using fetch()
function getWeather(lat, lon) {
  let api =
    `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  fetch(api)
    .then(blob => blob.json())
    .then(data => {
      let cTemp = data.main.temp;
      let city = data.name;
      let country = data.sys.country;
      let weatherType = data.weather[0].main;
      let weatherDesc = data.weather[0].description;
      let icon = data.weather[0].icon;
      querySelector("#city").innerHTML = city + ", " + country;
      querySelector("#weatherType").innerHTML =
        weatherType + " (" + weatherDesc + ")";
      querySelector("#icon").innerHTML =
        "<img alt='o' src=" + icon + ">";
      let fTemp = (cTemp * 9 / 5 + 32).toFixed(1);
      let toggleCF = false;
      let temp = querySelector("#temp");
      let metric = querySelector("#metric");
      temp.innerHTML = cTemp;
      metric.innerHTML =  " &#8451;";
      
      metric.addEventListener("click", function() {
      if (toggleCF === false) {
        temp.innerHTML = fTemp;
        metric.innerHTML = " &#8457;";
        toggleCF = true;
      } else {
        temp.innerHTML = cTemp;
        metric.innerHTML = " &#8451;";
       toggleCF = false;
      }
    });
    // console.log(weatherType);
    switch(weatherType) {
      case "Clear":
        querySelector("body").style["background-image"] = "url(https://images.unsplash.com/photo-1452561802015-953ab78c4526?dpr=1&auto=compress,format&fit=crop&w=1477&h=&q=80&cs=tinysrgb&crop=)";
        break;
      case "Clouds": 
        querySelector("body").style["background-image"] = "url(https://images.unsplash.com/44/xKNCBEgSTUGbgBoYgJ90_Skyline.jpg?dpr=1&auto=compress,format&fit=crop&w=751&h=&q=80&cs=tinysrgb&crop=)";
        break;
      case "Rain":
        querySelector("body").style["background-image"] = "url(https://images.unsplash.com/photo-1477847616630-cf9cf8815fda?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=)";
        break;  
      case "Mist":
        querySelector("body").style["background-image"] = "url(https://images.unsplash.com/30/ny-filtered.jpg?dpr=1&auto=compress,format&fit=crop&w=1508&h=&q=80&cs=tinysrgb&crop=)";
        break;
      case "Fog":
        querySelector("body").style["background-image"] = "url(https://images.unsplash.com/photo-1494054457339-2022c634b1ae?dpr=1&auto=compress,format&fit=crop&w=1570&h=&q=80&cs=tinysrgb&crop=)";
        break;
      case "Thunderstorm":
        querySelector("body").style["background-image"] = "url(https://images.unsplash.com/photo-1498595707991-4fc87268b184?dpr=1&auto=compress,format&fit=crop&w=1489&h=&q=80&cs=tinysrgb&crop=)";
        break;
      case "Snow":
        querySelector("body").style['background-image'] = 'url(https://images.unsplash.com/photo-1468476775582-6bede20f356f?dpr=1&auto=compress,format&fit=crop&w=1366&h=&q=80&cs=tinysrgb&crop=)';
        break;
      default: 
        querySelector("body").style["background-image"] = "url(https://images.unsplash.com/photo-1469433791803-c2719135f970?dpr=1&auto=compress,format&fit=crop&w=750&h=&q=80&cs=tinysrgb&crop=)";
        break;
    }
    querySelector('.spinner').classList.remove('load');
    })
    .catch(err => alert(err));
}

// making easy to get elements from the DOM and interecting with HTML
function querySelector(element) {
  return document.querySelector(element);
}

// getting the weather for the searched city, -google api
let searchBox = new google.maps.places.Autocomplete(
  document.querySelector("#city-search")
);
searchBox.addListener("place_changed", function() {
  let locale = searchBox.getPlace();
  let lat = locale.geometry.location.lat();
  let lon = locale.geometry.location.lng();
  querySelector('.spinner').classList.add('load');
  getWeather(lat, lon);
});