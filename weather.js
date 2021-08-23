let audio;
const apiCountry = "https://restcountries.eu/rest/v2/all";
let select = document.getElementById("select-box");
window.onload = function () {
  weather("Iran");
};

async function getCountryApi() {
  const response = await fetch(apiCountry);
  const data = await response.json();
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += "<option value="+parenthesesRemover(data[i])+">" + parenthesesRemover(data[i]) + "</option>";
  }
  select.innerHTML = html;
}
getCountryApi();
select.onclick = function (e) {
  let country = e.target.value;
  weather(country);
};

function parenthesesRemover(input) {
  return input.name.split("(")[0];
}
async function weather(countryName) {
  loader.style.visibility = "visible";
  const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${countryName}&units=metric&APPID=008e51b57f825445a20fc0eff12aed75`;
  const response = await fetch(weatherApi);
  const data = await response.json();
  loader.style.visibility = "hidden";
  let country = document.getElementById("country");
  let countryAbrivation = document.getElementById("country-abrivation");
  let temperature = document.getElementById("temperature");
  let status = document.getElementById("status");
  try {
    country.innerText = data.name;
    countryAbrivation.innerText = data.sys.country;
    temperature.innerHTML = data.main.temp + "<sup>°C</sup>";
    status.innerText = data.weather[0].description;
  } catch (err) {
    country.innerText = "-";
    countryAbrivation.innerText = "-";
    temperature.innerHTML = "-" + "<sup>°C</sup>";
    status.innerText = "No Data";
  }

  if (data.weather[0].description.includes("rain")) {
    let background = document.getElementById("background");
    background.style.backgroundColor = "#b0c3c2";
    document.body.style.backgroundImage = "url('img/rain.jpg')";

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio = new Audio("voice/rain.wav");
      audio.play();
    } else {
      audio = new Audio("voice/rain.wav");
      console.log(audio);

      audio.play();
    }
  }
  if (data.weather[0].description.includes("clouds")) {
    let background = document.getElementById("background");
    background.style.backgroundColor = "#ababab";
    document.body.style.backgroundImage = "url('img/cloud3.jpg')";

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio = new Audio("voice/clouds.wav");
      audio.play();
    } else {
      audio = new Audio("voice/clouds.wav");
      audio.play();
    }
  }
  if (data.weather[0].description.includes("sun")) {
    let background = document.getElementById("background");
    background.style.backgroundColor = "#ffe186";
    document.body.style.backgroundImage = "url('img/sun.jpg')";

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio = new Audio("voice/suny.wav");
      audio.play();
    } else {
      audio = new Audio("voice/suny.wav");
      audio.play();
    }
  }
  if (data.weather[0].description.includes("clear")) {
    let background = document.getElementById("background");
    background.style.backgroundColor = "#c6e2e6";
    document.body.style.backgroundImage = "url('img/clear.jpg')";

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio = new Audio("voice/clear.wav");
      audio.play();
    } else {
      audio = new Audio("voice/clear.wav");
      console.log(audio);
      audio.play();
    }
  }
  if (data.weather[0].description.includes("wind")) {
    let background = document.getElementById("background");
    background.style.backgroundColor = "#c1eef1";
    document.body.style.backgroundImage = "url('img/wind1.jpg')";

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio = new Audio("voice/windy.wav");
      audio.play();
    } else {
      audio = new Audio("voice/windy.wav");
      audio.play();
    }
  }
}
