const api ={
    key:"",
    base:"https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(evt) {
    if (evt.keyCode == 13){
        getResults(searchbox.value);
    }
}


function getResults(query) {
fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
.then(weather =>{
    return weather.json();
}).then(displayResults);
}

function displayResults(weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let data = document.querySelector('.location .data');
    data.innerText = dataBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dataBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = ["Sun","Mon","Tues","Wed","Thurs","Fri","Sat"];

    let day = days[d.getDay()]
    let data = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();


    return `${day} ${data} ${month} ${year}`;
}
