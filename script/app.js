const cityForm = document.querySelector('form')
const cards = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')


const updateUI = (data) => {

  const { cityDets, weather } = data

  //update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  `
  
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
  icon.setAttribute('src', iconSrc)
  
  
  let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'

  time.setAttribute('src', timeSrc)

  //remove the d-none class
  if(cards.classList.contains('d-none')){
    cards.classList.remove('d-none')
  }

}

const updateCity = async (city) => {
  
  const cityDets = await getCity(city)
  const weather = await getWeather(cityDets.Key)

  return {cityDets,weather}
}

cityForm.addEventListener('submit', (e) => {
  // prevent default action
  e.preventDefault()

  //get city value
  const city = cityForm.city.value.trim()
  cityForm.reset()
  
  //update the UI with new city
  updateCity(city).then((data)=>{ updateUI(data)
  })
  
  //stoed city on localstorage
  localStorage.setItem('city', city)
})
if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
  .then((data)=>{ updateUI(data)})
  .catch((err)=>{console.log(err)})
}


