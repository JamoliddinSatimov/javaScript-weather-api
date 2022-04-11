const api = {
    key:'76e4926a53984f234ca3f7dd3b3c17b3',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
}
const searchBox = document.querySelector(".search-box");

searchBox.addEventListener('keypress',setQuery )

function setQuery(e){
    if(e.keyCode==13){
        console.log(searchBox.value);
        getResults(searchBox.value)
    }
}
function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((weather)=>{
            return weather.json();
        })
        .then(displayresults)
}


function displayresults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city'),
    date = document.querySelector('.location .date'),
    temp = document.querySelector(".temp"),
    description = document.querySelector(".weather");
    const now = new Date();
    city.innerHTML = `${weather.name}, ${weather.sys.country}`
    date.innerHTML=dataBuilder(now)
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`
    description.innerHTML = `${weather.weather[0].main}`
}

function dataBuilder(s){
    let months = [
        "Januar",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let weekDay = days[s.getDay()]
    let date = s.getDate()
    let month = months[s.getMonth()]
    let year = s.getFullYear()

    return `${weekDay} ${date} ${month} ${year}`
}