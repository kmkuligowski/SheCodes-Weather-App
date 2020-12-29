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

function showTemp(response){
   let iconElement= document.querySelector("#icon");

  document.querySelector("#city-name").innerHTML=response.data.name;

  document.querySelector("#main-temp").innerHTML=Math.round(response.data.main.temp);
  
  document.querySelector("#weather-condition").innerHTML=(response.data.weather[0].description);
 
 document.querySelector("#wind-speed").innerHTML=Math.round(response.data.wind.speed);

  document.querySelector("#humid-percentage").innerHTML=(response.data.main.humidity);
 iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 
}

function searchCity(city){
let apiKey ="0ee65006a00c913e43ac0bf2c3ea0b12";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showTemp);
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

let h4 = document.querySelector("#date");
let currentDate= new Date();
h4.innerHTML= formatDate(currentDate);

let form = document.querySelector("form");
form.addEventListener("submit", submitCity);

let locationButton= document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

searchCity("Boston");
//let cChangeTemp= document.querySelector("#celsius");
//cChangeTemp.addEventListener("click",cChange);


