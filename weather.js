// weather.js

// OpenWeatherMap API 키 (개인 발급 받은 값)
const API_KEY = '75486a58af102f1fb237ea3b5ad2ffa4';
// 날씨 정보를 가져올 도시 이름 (현재는 고정값 'Busan')
const CITY = 'Kanagawa';

export async function fetchWeather(weatherBox) {
  // API 호출 URL 구성 (도시, 언어, 섭씨단위 포함)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=ja&appid=${API_KEY}`;
  // fetch 요청 → 응답 받기 (fetch는 서버 혹은 API에게 '이 주소로 요청 보내줘'라고 말하는 함수. 거기에 await을 붙이면 응답이 올때까지 기다렸다가 그 결과를 res에 담아줘 라는 뜻)
  const res = await fetch(url);
  // 응답을 JSON 형식으로 파싱. JSON 데이터를 JS 객체로 바꿔줌
  const data = await res.json();

  // 날씨 정보를 HTML로 표시
  weatherBox.innerHTML = `
    <h2>☁️ 天気情報</h2>
    <p>${data.name}, ${data.weather[0].description}</p>
    <p>${Math.round(data.main.temp)}℃</p>
  `;
}

  // 오늘이 아닌 날짜를 선택했을 때 보여줄 안내 메시지
export function showNoForecast(weatherBox) {
  // 예보가 준비되지 않았다는 메시지 출력
  weatherBox.innerHTML = `
    <h2>☁️ 天気情報</h2>
    <p>${CITY}の天気は</p>
    <p><strong>天気予報を取得中… ☁️</strong></p>
  `;
}

// export는 다른 파일(script.js)에서 이 함수들을 불러오기 위해 필요
// await는 async function 안에서만 쓸 수 있음
// JSON = JavaScript Object Notation > 데이터를 표현하는 방식
