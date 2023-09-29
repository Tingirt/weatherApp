let currCity = "Addis Ababa";
const API_KEY = "3509439a4aa1a597f0c7a33ad0e91f97";

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}`;
      fetch(url)
        .then(res => {
          return res.json()
        }) 
        .then((data) => {
          //console.log(data);
          weatherReport(data);
        });
    });
  }
});
document.getElementById('search').addEventListener('click',()=>{
  var place=document.getElementById('input_section').value;
 console.log(place);
  
  var urlsearch= `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${API_KEY}`;
  fetch(urlsearch)
  .then(res => {
    return res.json()
  }) 
  .then((data) => {
  weatherReport(data);
  });
})
function weatherReport(data) {
 // console.log(`City Name: ${data.name}`);
  var urlcast = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${API_KEY}`;
 // console.log(`URL for Forecast: ${urlcast}`);
  fetch(urlcast)
    .then((res) => {
      return res.json();
    })
    .then((forecastData) => {
     // console.log(forecastData);
      hourforecast(forecastData);
      dayforecast(forecastData);

      document.getElementById('city').innerText = data.name + ', ' + data.sys.country;

      document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273) + '°C'; // Corrected math function

      document.getElementById('clouds').innerText = data.weather[0].description; // Corrected element ID

      let icon = data.weather[0].icon;
      let iconurl = `https://openweathermap.org/img/wn/${icon}@2x.png`; // Corrected image URL
      document.getElementById('image').src = iconurl;
     // console.log(data);
    });
}

function hourforecast(forecast) {
  document.querySelector('.templist').innerHTML='';
  for(let i=0;i<5;i++){
    var date= new Date(forecast.list[i].dt*1000);
    let hourR=document.createElement('div');
    hourR.setAttribute('class','next');

    let div=document.createElement('div');
    let time=document.createElement('p');
    time.setAttribute('class','time');
    time.innerText=(date.toLocaleTimeString(undefined,'Africa/Ethiopia')).replace(':00','');

    let temp= document.createElement('p');
    temp.innerText = Math.floor(forecast.list[i].main.temp_max - 273) + '°C' + ' / '+ Math.floor(forecast.list[i].main.temp_min - 273) + '°C';
    
    div.appendChild(time);
    div.appendChild(temp);

    let desc= document.createElement('p');
    desc.setAttribute('class','desc');
    desc.innerText=forecast.list[i].weather[0].description;

    hourR.appendChild(div);
    hourR.appendChild(desc);
    document.querySelector('.templist').appendChild(hourR);

 
  }
}
function dayforecast(forecast) {
  document.querySelector('.weekF').innerHTML='';

  for(let i=8;i<forecast.list.length;i+=8){
   // console.log(forecast.list[i]);
      let div = document.createElement('div');
      div.setAttribute('class','dayf');

      let day= document.createElement('p');
      day.setAttribute('class','date');
      day.innerText= new Date (forecast.list[i].dt*1000).toDateString(undefined,'Africa/Ethiopia');
      div.appendChild(day);

      let temp= document.createElement('p');
      temp.innerText= Math.floor(forecast.list[i].main.temp_max - 273) + '°C' + ' / '+ Math.floor(forecast.list[i].main.temp_min - 273) + '°C'; 
      div.appendChild(temp);

      let description=document.createElement('p');
      description.setAttribute('class','description');
      description.innerText= forecast.list[i].weather[0].description;
      div.appendChild(description);

      document.querySelector('.weekF').appendChild(div);
  }
}
