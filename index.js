//+++++ Very Important +++++++++
/*
When we get data from daily forecaste from api it gives weather report after
every 3 hours so it means it will show weather forcaste 8 times a day. And list
array have data of 40 objects it means we have total 5 days of weather forcaste
so we only want forscast of each day 1 time only not 8 times that's why we have
written the complex function down below
*/

const button= document.querySelector('.btn')
const input= document.querySelector('.prompt')
const API_KEY='36b4f74140dc47acd97688c1ee1de43f'
const cards= document.querySelector('.cards')
const card= document.querySelector('.card-item')





const printWeather=(name, weatherItem, index)=>{
   //Somtimes we want some part of string for that purpose we do data.split(' ')[index of string we want]
   //This when we print data in our main card
      if (index === 0) {
         return `
         <h2>${name} (${weatherItem.dt_txt.split(' ')[0]})</h2>
         <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="">
         <p>${weatherItem.weather[0].description}</p>
         <h4>Temprature : ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
         <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
         <h4>Humidity: ${weatherItem.main.humidity}</h4>
         `
         } 
         //This is when we parse our data to next 5 cards
         else {
         return `
         <li class="card-list">
         <h4>(${weatherItem.dt_txt.split(' ')[0]})</h4>
         <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="">
         <h4>Temprature : ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
         <h4>Wind: ${weatherItem.wind.speed} M/S</h4>
         <h4>Humidity: ${weatherItem.main.humidity}</h4>
     </li>
   `
      }
       
   }
      
 
   //First we have to get coordinates to get the data from OpenWeather map API that's why we wrote this fucntion
   
     
     function getCityCoordinates() {
      const cityName=input.value.trim()// Got city name and removed extra space
      if(!cityName) return; // If city name is empty return
  
      const API_URL=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      fetch(API_URL)
     .then(res=>res.json())
     .then((data)=> {
  //    const lat=data[0].lat This how I am doing but we can do it in good manner
  //    const lon=data[0].lon
     input.value=""
     cards.innerHTML=''
     card.innerHTML=''
     const {name, lat, lon }=data[0] //This is good approach
     getWeather(name, lat, lon)
  })
     .catch(()=>console.log('Cannot get response'))
     
  }

  //Main differece b/w forEach and filter is that filter returns value but foreEach return undefined
  //We write this function to get the data from api 
   
   function getWeather(name, lat, lon) {
      const WEATHER_API_URL=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      fetch(WEATHER_API_URL)
      .then(res=>res.json())
      .then((data)=> {
      const uniqueDays=[]
         
      const weatherDetail=data.list.filter( forcast =>{
         const forcastDate= new Date(forcast.dt_txt).getDate()
         if (!uniqueDays.includes(forcastDate)) {
            return uniqueDays.push(forcastDate)
         
         }
      })
         
      
      weatherDetail.forEach((weatherItem, index) => {
           if (index === 0) {
              card.innerHTML=printWeather(name, weatherItem, index)
            
           } else {
            
              cards.insertAdjacentHTML('beforeend',printWeather(name, weatherItem, index))
           }
         });
      })
      .catch(()=>console.log('Error in getting data from weather api'))}
            
            
      button.addEventListener('click',getCityCoordinates)
      
      
      
     
      
    




    













/*
    line- we use filter to get data from list
    line- we get dt_txt which gives date and we conve
    */

    //Remember this scenario if want only one value to filter out 
   // const uniqueForecastDays=[]
   // const fiveDaysForecast= data.list.filter(forecast=>{
   //      //We get date here in "2024-02-16 21:00:00" so we converted it's format and then got only date from it
   //    //   const forecasteDate= new Date(forecast[0].dt_txt).getDate()
   //     //Here we are checking so that date come only one time as each date come 8 times
   //    //  if (!uniqueForecastDays.includes(forecasteDate)) {
   //    //   return uniqueForecastDays.push(forecasteDate)// Pushing each date one time in array
   //    //   //As we have used {} that's why we have to use return here 
   //    //  }
   //   // In this function we are extracting data on the basis of if function
   // //   console.log(forecast[0]);
   //     })
    
      //  console.log(fiveDaysForecast);