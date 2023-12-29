const btnSearch = document.querySelector("#btn-search");

const renderWeather = async () => {
    const apiKey = `ba605efc18f1572f61892fe426f18a1a`;
    const inputSearch = document.querySelector("#city-input");

    if (inputSearch.value.trim() === "") {
        document.querySelector(".weather").classList.add("hide");
        document.querySelector(".error-message").classList.remove("hide");
        document.querySelector(".error-message p").textContent = "Você deve digitar uma localidade!";
        return;
    }

    const data = await fetchWeather(inputSearch.value, apiKey);

    if (data) {
        renderData(data);
        renderImg(data);
    }

}

const fetchWeather = async (cityInput, apiKey) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${apiKey}&lang=pt_br`;

    try {
        const response = await fetch(apiWeatherURL);
        const data = await response.json();

        if (data.cod === "404") {

            document.querySelector(".weather").classList.add("hide");
            document.querySelector(".error-message").classList.remove("hide");
            document.querySelector(".error-message p").textContent = "Localidade não encontrada!";
            return false;

        } else {

            document.querySelector(".weather").classList.remove("hide");
            document.querySelector(".error-message").classList.add("hide");
    
            return data;
        }

    } catch(err) {

        document.querySelector(".weather").classList.add("hide");
        document.querySelector(".error-message").classList.remove("hide");
        document.querySelector(".error-message p").textContent = "Erro durante a requisição!";

    }

}

const renderData = (data) => {
    document.querySelector(".temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".city-name").textContent = `${data.name}`;
    document.querySelector("#humidity").textContent = `${data.main.humidity}`;
    document.querySelector("#wind").textContent = `${data.wind.speed}`;
}

const renderImg = (data) => {

    const weatherImg = document.querySelector(".weather-img");

    switch (data.weather[0].main) {
        case "Clouds":
            weatherImg.src = "../images/clouds.png";
            break;
        case "Clear":
            weatherImg.src = "../images/clear.png";
            break;
        case "Rain":
            weatherImg.src = "../images/rain.png";
            break;
        case "Drizzle":
            weatherImg.src = "../images/drizzle.png";
            break;
        case "Mist":
            weatherImg.src = "../images/mist.png";
            break;
        case "Snow":
            weatherImg.src = "../images/snow.png";
            break;
        default:
            weatherImg.src = "../images/mist.png";
            break;
    }
}

btnSearch.addEventListener("click", renderWeather);