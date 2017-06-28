var weather;
var myIconBlock = document.getElementsByTagName('canvas')[0];
var myTimezone = document.getElementById('timezone');
var myDataWeather = document.getElementById('tempr');
var myDataPressure = document.getElementById('pressure');
var myDataIcon = document.getElementById('iconWeather');
var myIcons = document.getElementById('weatherIcons');
var myCurrentDate = document.getElementById('currentDate');
var data = new Date();
var newdataObj = data;
var currentTime = parseInt(data.getTime()/1000);
var buttonPrev = document.getElementById('buttonPrev');
var buttonNext = document.getElementById('buttonNext');
var doba = 84600;
var dobaMsek = 86400000;
var cors = 'https://cors-anywhere.herokuapp.com/';

//функція визначення попереднього дня
function previusData(){
  var newdata = new Date(newdataObj.getTime()  - dobaMsek);
  return newdata;
 };

//функція визначення наступного дня
 function nextData(){
   var newdata = new Date(newdataObj.getTime() + dobaMsek);
   if(newdataObj .getDate() == data.getDate()){
     buttonNext.setAttribute('disabled');
    

   };
   return newdata;
  };

   //Вішання події на кнопку попереднього дня
   buttonPrev.onclick = function(){
   newdataObj = previusData();
   currentTime = currentTime - doba;
     getWeather(currentTime, newdataObj);
   };

   //Вішання події на кнопку наступного дня
   buttonNext.onclick = function(){
   newdataObj = nextData();
   currentTime = currentTime + doba;
      getWeather(currentTime,newdataObj);
    };

 //функція ajax запиту
function getWeather(currentTime,data){
   var url = cors + 'https://api.darksky.net/forecast/b3fcb47c11e26ffd92efdf94d1cb478e/49.80,23.98'+','+ currentTime;
  var xhr = new XMLHttpRequest();
  xhr.open('GET',url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status != 200) {
      alert(xhr.status + ': ' + xhr.statusText);
      return;
    };
    weather = JSON.parse(xhr.response);
    addWeather(data);
    };
    xhr.send();

    };
    getWeather(currentTime,data);

  //функція додавання погоди
function addWeather(data){
   myIconBlock.setAttribute('id',weather.currently.icon);
   var cell = Math.round((weather.currently.temperature - 32)/1.8);
   myTimezone.innerHTML = weather.timezone;
   myDataWeather.innerText = cell+"°C";
   myDataPressure.innerHTML = weather.currently.pressure + ' гПа';
   myCurrentDate.innerHTML = data.getDate() +'/'+ (data.getMonth() + 1) +'/'+ data.getFullYear();

  //анімація іконок
   var icons = new Skycons(),
       list  = [
         "clear-day", "clear-night", "partly-cloudy-day",
         "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
         "fog"
       ],
       i;
   for(i = list.length; i--; )
     icons.set(list[i], list[i]);
   icons.play();

 };
