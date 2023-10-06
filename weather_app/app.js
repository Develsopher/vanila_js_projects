import { getWeatherIconInfo } from './getWeatherIconInfo.js';
import API_KEY from './apiKey.js';

const apiKey = API_KEY;
const main = document.querySelector('.main');
const loadingElement = document.querySelector('.loading');

async function getCurrentLocationWeather() {
  showLoading();
  const { coords } = await getCurrentPosition();
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}&units=metric`;
  getWeather(api);
}

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject('Location not found 👀');
    }
  });
}

// API 호출 함수
async function getWeather(api) {
  try {
    const response = await fetch(api);
    const data = await response.json();
    setWeather(data);
  } catch (error) {
    console.log('error', error);
    showError('An error occurred 😭');
  }
}

// 날씨 정보 설정 함수
function setWeather(data) {
  const { cod, name, main, weather, wind } = data;
  if (cod === 200) {
    updateDOM(name, main.temp, main.humidity, wind.speed, weather[0]);
    hideLoading();
  } else {
    showError('City not found 😭');
  }
}

const setIcons = (currentIcon, iconId) => {
  const skycons = new Skycons({ color: 'black' });
  skycons.play();
  return skycons.set(iconId, currentIcon);
};

// DOM 업데이트 함수
function updateDOM(city, temperature, humidity, windSpeed, weatherInfo) {
  const cityElement = document.querySelector('.location-city');
  const temperatureElement = document.querySelector('.location-temperature');
  const humidityElement = document.querySelector('.location-humidity');
  const windElement = document.querySelector('.location-wind');
  const iconElement = document.querySelector('.icon');
  const bodyElement = document.querySelector('body');
  const searchElement = document.getElementById('search-city');

  cityElement.innerHTML = city;
  searchElement.value = city;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = windSpeed;

  const weatherInformation = getWeatherIconInfo(
    weatherInfo.id,
    weatherInfo.icon,
  );
  setIcons(weatherInformation, iconElement);
  bodyElement.classList.add(weatherInformation);
}

// 에러 표시 함수
function showError(message) {
  loadingElement.innerHTML = message;
}

// 로딩 상태 함수
function showLoading() {
  loadingElement.classList.add('active');
  main.style.display = 'none';
}

function hideLoading() {
  loadingElement.classList.remove('active');
  main.style.display = 'block';
}

// 이벤트 리스너
window.addEventListener('load', getCurrentLocationWeather);

document.querySelector('.search-icon').addEventListener('click', () => {
  const city = document.getElementById('search-city').value;
  if (city) {
    showLoading();
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    getWeather(api);
  }
});
