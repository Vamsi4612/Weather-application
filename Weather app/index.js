// "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=5ddb4226ac2971cdb8689dff08a6c19b";
//`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27d64df8bc8f1efcf8a215194587767f`

function getData(){
    let city=document.getElementById('city').value;
    const url1= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27d64df8bc8f1efcf8a215194587767f`

    fetch(url1)
    .then(function(res){
    return res.json();
    })
    .then(function(res){
    // console.log('res:', res);
    appendData(res)
   
    // console.log(res.main.temp)
    }).catch(function(err){
        console.log('err:', err)
    })
}



function appendData(data){
    // let a= &deg; or &#176;
    // console.log(data)
    let container= document.getElementById('container');
    let map = document.getElementById('gmap_canvas');
    container.innerHTML=null;


    let forecast = document.createElement('button')
    forecast.innerText='Get next 7 Days forecast'
    forecast.onclick= getForecast();


    let week= document.createElement('div')
    week.setAttribute('class','week')

    // week.append(forecast);




    let city = document.createElement('p')
    city.setAttribute('class','city')
    city.innerText = `${data.name}`;

    let min = document.createElement('p')
    let a= data.main.temp_min-282;
    let a1 = a.toFixed(2);
    min.innerText = `Min Temp: ${a1} ℃` ;

    let max = document.createElement('p')
    let b =data.main.temp_max - 272;
    let b1 = b.toFixed(2)
    max.innerText = `Max Temp: ${b1} ℃`;

    let div=document.createElement('div');
    div.setAttribute('class','minMax');
    div.append(min,max);

    let current = document.createElement('p')
    current.setAttribute('class','current')
    let c= data.main.temp- 273;
    let c1 = c.toFixed()
    current.innerText = ` ${c1} ℃ `;


    let clear = document.createElement('p');
    clear.setAttribute('class','clear');
    clear.innerText='Clear';

    let feelLike = document.createElement('p')
    feelLike.setAttribute('class','feelLike');
    let d= data.main.feels_like- 272;
    let d1 = d.toFixed(2);
    feelLike.innerText=`Feels like: ${d1} ℃`;

    let humidity= document.createElement('p')
    humidity.setAttribute('class','humidity');
    humidity.innerText= `Humidity: ${data.main.humidity} %`;

    let humidityDiv= document.createElement('div')
    humidityDiv.setAttribute('class','humidityDiv');

    humidityDiv.append(clear,feelLike,humidity)


    let windspeed = document.createElement('p')
    windspeed.setAttribute('class','wind');
    windspeed.innerText = `Wind Speed:${data.wind.speed} mph`

    let visibility = document.createElement('p')
    visibility.setAttribute('class','visibility');
    let e= data.visibility/1000;
    // console.log('data:', data.visibility);

    let e1 = e.toFixed(2)
    visibility.innerText =`Visibility: ${e1} Km`

    let windDiv= document.createElement('div');
    windDiv.setAttribute('class','windDiv')
    windDiv.append(windspeed,visibility)


    container.append(city,current,div,humidityDiv,windDiv,week);

    map.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

}



    
function getForecast(){
    let city=document.getElementById('city').value;
        const forecasteUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=27d64df8bc8f1efcf8a215194587767f`
    
        fetch(forecasteUrl)
        .then(function(res){
            return res.json();
        })
        .then(function(res){
        console.log('res:', res.list)
        appendForecast(res.list)
        })
        .catch(function(err){
            console.log('err:', err)
        })
}

function appendForecast(forecastdata){
    console.log('forecastdata:', forecastdata)
    

    function getMonthStrings() {
        return [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
    }
   
    function getCurrentFormattedDate(date) {
        a= (function () {
           return getMonthStrings()[this.getMonth()] + ' ' + (function (d) {
               var s = d.toString(), l = s[s.length - 1];
               return s + (['', '', ''][l - 1] || '');
           })(this.getDate()) + ', ' + this.getFullYear() + ' ' + ('0' + (this.getHours() % 12 || 12)).slice(-2) + ':' + ('0' + this.getMinutes()).slice(-2) + ':' + ('0' + this.getSeconds()).slice(-2) + ' ' + (this.getHours() >= 12 ? 'PM' : 'AM');
       }).call(date || new Date());

       console.log('a:', a)

        const currentDay = new Date(`${a}`);
        const day1 = currentDay.getDay();
        console.log('day1' ,Number(day1));


        let dayArr=[ "Sun", "Mon", "Tue", "Wed", "Thu" , "Fri", "Sat"];

        let container1=document.getElementById("future");
        container1.innerHTML=null;
        let skip=0;
        let count=0;
        let b=day1+7;
    
        for(let i=(day1+1); i<b; i++){

            if(count>=7)
            {
                break;
            }

            if(i==7){
                i=0;
                b=b-count;
                console.log('b:', b)

                skip++;
            }

            if(skip>1)
            {
                break;
            }

            count++;

                let div=document.createElement("div");
                div.setAttribute('class','forecastBox')

                let day=document.createElement("p");
                day.innerText=dayArr[i];

                let img=document.createElement("img");
                img.src="http://openweathermap.org/img/wn/"+forecastdata[i].weather[0].icon+"@2x.png";

                console.log("http://openweathermap.org/img/wn/"+forecastdata[i].weather[0].icon+"@2x.png");

                let dayTemp=document.createElement("p");
                dayTemp.innerText= `Max :${(forecastdata[i].main.temp-273).toFixed(2)} ℃`;

                let nightTemp=document.createElement("p");
                nightTemp.innerText=`Min :${(forecastdata[i].main.feels_like-280).toFixed(2)} ℃ `;
            
            div.append(day, img, dayTemp, nightTemp);
            container1.append(div);

   }
   
   
}
getCurrentFormattedDate();

}



























// function getLocation(lat, lon){

//     const url= `// https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=27d64df8bc8f1efcf8a215194587767f`

//     fetch(url)
//     .then(function(res){
//        return res.json();
//     })
//     .then(function(res)
//     {
//     console.log('res:', res);
//         appendData(res)
//     // console.log(res.main.temp)
//     }).catch(function(err){
//         console.log('err:', err)
//     })
// }
//  sys:
// country: "IN"
// sunrise: 1649982620
// sunset: 1650028048



// function getLocationData(){
//     navigator.geolocation.getCurrentPosition(success);
    
//     function success(pos){
//         var crd = pos.coords;
    
//         console.log('Your current position is:');
//         console.log(`Latitude : ${crd.latitude}`);
//         console.log(`Longitude: ${crd.longitude}`);
//         console.log(`More or less ${crd.accuracy} meters.`);

//         getLocation(crd.latitude, crd.longitude);
//     }

// }
// function getWeather() {
//     navigator.geolocation.getCurrentPosition(success);
  
//     function success(position) {
//       let crd = position.coords;
  
//       console.log("Your current position is:");
//       console.log(`Latitude : ${crd.latitude}`);
//       console.log(`Longitude: ${crd.longitude}`);
//       console.log(`More or less ${crd.accuracy} meters.`);
//       getDatafor7days(crd.latitude, crd.longitude)
//     //   getDataLocation();
//     }
//   }


// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



// const getDatafor7days = async (lat, lon) => {
//     let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api}`;
//     try {
//       let res = await fetch(url);
//       let data = await res.json();
//       console.log("data", data);
//     } catch (error) {
//       console.log(error);
//     }
//   };


  

 