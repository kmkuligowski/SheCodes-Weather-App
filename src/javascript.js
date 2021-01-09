function formatDate(date){
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
let day= days[date.getDay()];
let hour = date.getHours();
if (hour<10){
  hour=`0${hour}`
}

let mins = date.getMinutes();
if (mins<10){
  mins=`0${mins}`
}
 return `${day}, ${hour}:${mins}`;
}

function formatTime(timestamp){
let date= new Date(timestamp);
let hours=date.getHours();
if(hours<10){
  hours=`0${hours}`;
}
let minutes=date.getMinutes();
if (minutes<10){minutes=`0${minutes}`}
return `${hours}:${minutes}`;}

function showTemp(response){
   let iconElement= document.querySelector("#icon");

   fTemperature= response.data.main.temp;

  document.querySelector("#city-name").innerHTML=response.data.name;

  document.querySelector("#main-temp").innerHTML=Math.round(response.data.main.temp);
  
  document.querySelector("#weather-condition").innerHTML=(response.data.weather[0].description);
 
 document.querySelector("#wind-speed").innerHTML=Math.round(response.data.wind.speed);

  document.querySelector("#humid-percentage").innerHTML=(response.data.main.humidity);
 iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
}

function displayForecast(response){
  let forecastElement= document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast=null;

  for (let index = 0; index < 6; index++){
    let forecast= response.data.list[index];
    forecastElement.innerHTML+=`
    <div class="col-2">
    <h4>${formatTime(forecast.dt*1000)}</h4>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="weather image">   
    <h4>${Math.round(forecast.main.temp_max)}°</h4>
    </div>`}}



function searchCity(city){
  let apiKey ="0ee65006a00c913e43ac0bf2c3ea0b12";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemp);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function submitCity(event){
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function usePosition(position){
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey="0ee65006a00c913e43ac0bf2c3ea0b12";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemp);
}

function getCurrentPosition(){
  navigator.geolocation.getCurrentPosition(usePosition);
}

function showCelsiusChange(event){
event.preventDefault();
let cTemperature=Math.round(fTemperature-32 * 5/9);
let temperatureElement=document.querySelector("#main-temp");
temperatureElement.innerHTML=cTemperature;
}

function showFahrenheitChange(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#main-temp");
  temperatureElement.innerHTML=Math.round(fTemperature);
}


let h4 = document.querySelector("#date");
let currentDate= new Date();
h4.innerHTML= formatDate(currentDate);

let form = document.querySelector("form");
form.addEventListener("submit", submitCity);

let fTemperature="null"

let locationButton= document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);


let celsiusLink= document.querySelector("#celsius");
celsiusLink.addEventListener("click",showCelsiusChange);

let fahrenheitLink=document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitChange);


searchCity("Boston");