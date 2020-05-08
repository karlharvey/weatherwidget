/*jslint browser:true */

function getLocation() {
  if (navigator.geolocation) {
    alert("Geolocation available");
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      var currentUrl =
        "//api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=770c2f41007371eb49fe4da42974d5e4&units=metric";

      var forecaseUrl =
        "//api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        long +
        "&appid=770c2f41007371eb49fe4da42974d5e4&units=metric";

      getWeatherData(currentUrl, forecaseUrl);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function getWeatherData(currentUrl, forecaseUrl) {
  var weatherConditions = new XMLHttpRequest();
  var weatherForecast = new XMLHttpRequest();
  var cObj;
  var fObj;
  console.log(currentUrl);

  // GET THE CONDITIONS
  weatherConditions.open("GET", currentUrl, true);
  weatherConditions.responseType = "text";
  weatherConditions.send(null);

  weatherConditions.onload = function () {
    if (weatherConditions.status === 200) {
      cObj = JSON.parse(weatherConditions.responseText);
      console.log(cObj);
      document.getElementById("location").innerHTML = cObj.name;
      document.getElementById("weather").innerHTML =
        cObj.weather[0].description;
      document.getElementById("temperature").innerHTML =
        Math.round(cObj.main.temp) + "°C";
      document.getElementById("desc").innerHTML =
        "Wind Speed: " + cObj.wind.speed + "mph";
    } //end if
  }; //end function

  // GET THE FORECARST
  weatherForecast.open("GET", forecaseUrl, true);
  weatherForecast.responseType = "text";
  weatherForecast.send();

  weatherForecast.onload = function () {
    if (weatherForecast.status === 200) {
      fObj = JSON.parse(weatherForecast.responseText);
      console.log(fObj);

      for (var i = 0, r = 1; i <= 24; i += 8, r++) {
        console.log(i);
        console.log(r);
        var date_raw = fObj.list[i].dt_txt;
        date_raw = date_raw.substring(5, 11);
        document.getElementById("r" + r.toString() + "c1").innerHTML = date_raw;

        var iconcode = fObj.list[i].weather[0].icon;
        var icon_path = "https://openweathermap.org/img/w/" + iconcode + ".png";
        document.getElementById("r" + r.toString() + "c2").src = icon_path;
        document.getElementById("r" + r.toString() + "c3").innerHTML =
          Math.round(fObj.list[i].main.temp_min) + "°C";
        document.getElementById("r" + r.toString() + "c4").innerHTML =
          Math.round(fObj.list[i].main.temp_max) + "°C";
      }
    }
  };
}

/*var date_raw = fObj.list[0].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r1c1').innerHTML=date_raw;

    var iconcode = fObj.list[0].weather[0].icon;
    var icon_path = "http://openweathermap.org/img/w/" + iconcode + ".png"
    document.getElementById('r1c2').src = icon_path;
    document.getElementById('r1c3').innerHTML = Math.round(fObj.list[0].main.temp_min)+"°C";
    document.getElementById('r1c4').innerHTML = Math.round(fObj.list[0].main.temp_max)+"°C";

    var date_raw = fObj.list[8].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r2c1').innerHTML=date_raw;

    var iconcode = fObj.list[8].weather[0].icon;
    var icon_path = "http://openweathermap.org/img/w/" + iconcode + ".png"
    document.getElementById('r2c2').src = icon_path;
    document.getElementById('r2c3').innerHTML = Math.round(fObj.list[8].main.temp_min)+"°C";
    document.getElementById('r2c4').innerHTML = Math.round(fObj.list[8].main.temp_max)+"°C";

    var date_raw = fObj.list[16].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r3c1').innerHTML=date_raw;

    var iconcode = fObj.list[16].weather[0].icon;
    var icon_path = "http://openweathermap.org/img/w/" + iconcode + ".png"
    document.getElementById('r3c2').src = icon_path;
    document.getElementById('r3c3').innerHTML = Math.round(fObj.list[16].main.temp_min)+"°C";
    document.getElementById('r3c4').innerHTML = Math.round(fObj.list[16].main.temp_max)+"°C";
  } //end if
}; //end function*/
