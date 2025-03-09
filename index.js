const imgAuthor = document.getElementById('img-author')


async function getPictureFromApi() {

    try {
        const responce = await fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
        const data = await responce.json()
        const imgUrl = data.urls.full
        document.body.style.backgroundImage = `url('${imgUrl}')`
        const authorName = data.user.name
        imgAuthor.textContent = `By: ${authorName}`
    } catch (error) {
        console.error('Error:', error);
    }


}



async function getCryptoData() {

    try {
        const responce = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
        const data = await responce.json()

        const cryptoContainer = document.getElementById('crypto-container')

        cryptoContainer.innerHTML = ` 
            <div id="crypto" class="crypto">
                <img src="${data.image.small}" alt="${data.name} logo">
                <p id="crypto-name" class="crypto-name">${data.name}</p>
            </div>
            <div class="crypto-info">
                <p>🎯: $${data.market_data.current_price.usd}</p>
                <p>👆: $${data.market_data.high_24h.usd}</p>
                <p>👇: $${data.market_data.low_24h.usd}</p>
            </div>
        `
    } catch (error) {
        console.error('Error:', error);
    }

}

getPictureFromApi()

getCryptoData()


const timeEl = document.getElementById('time')

const updateTime = () => {
    const date = new Date()
    let dateFormatted = date.toLocaleTimeString("en-us", { timeStyle: "medium" })
    timeEl.textContent = dateFormatted
}


setInterval(updateTime, 1000);


if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {

        getCurrentWeather(position.coords.latitude, position.coords.longitude)

    });
} else {

}



async function getCurrentWeather(latitude, longitude) {
 
    const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=cc3bab8927c57c719b8f3ada04bc9899`)
    const data = await res.json()

    const weatherIconEL = document.getElementById('weather-icon')
    let weatherIcon = data.weather[0].icon
    weatherIconEL.src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`

    const cityEl = document.getElementById('city')
    let city = data.name
    cityEl.textContent = city

    const temperatureEl = document.getElementById('temperature')
    let temp = Math.floor(data.main.temp)
    temperatureEl.innerHTML = `${temp}&deg;`

}