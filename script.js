// script.js

// 기능 모듈 import
import {
    loadFromLocalStorage,
    saveToLocalStorage,
    renderTodos,
    addTodo,
    editTodo,
    deleteTodo,
    setSelectedDate
  } from './todos.js';
  
  import {
    fetchWeather,
    showNoForecast
  } from './weather.js';
  
  // 주요 DOM 요소 불러오기
  const input = document.getElementById('todo-input');
  const addBtn = document.getElementById('add-btn');
  const todoList = document.getElementById('todo-list');
  const sidebar = document.getElementById('sidebar');
  const editInput = document.getElementById('edit-input');
  const editBtn = document.getElementById('edit-confirm');
  const deleteBtn = document.getElementById('edit-delete');
  const dateDisplay = document.getElementById('selected-date-display');
  const weatherBox = document.getElementById('weather-box');
  
  // 새로운 할 일 등록 이벤트
  addBtn.addEventListener('click', function () {
    const value = input.value.trim();
    if (value === '') {
      alert('タスクを入力してください!');
      return;
    }
    addTodo(value); // 새 할 일 추가
    input.value = ''; // 입력창 비우기
    renderTodos(todoList, sidebar, editInput); // 목록 다시 그리기
  });
  
  // 수정 버튼 이벤트
  editBtn.addEventListener('click', function () {
    editTodo(editInput, sidebar); // 현재 항목 수정
    renderTodos(todoList, sidebar, editInput); // 목록 갱신
  });

  // 삭제 버튼 이벤트
  deleteBtn.addEventListener('click', function () {
    deleteTodo(sidebar); // 항목 삭제
    renderTodos(todoList, sidebar, editInput); // 목록 갱신
  });
  
  flatpickr("#date-picker", {
    dateFormat: "Y-m-d", // 날짜 형식
    defaultDate: new Date(), // 초기 날짜
    onChange: function (selectedDates, dateStr) {
      setSelectedDate(dateStr); // 선택된 날짜 저장
      dateDisplay.textContent = dateStr; // UI에 표시
      renderTodos(todoList, sidebar, editInput); // 해당 날짜 할 일 그리기
  
      const today = new Date();
      const selected = new Date(dateStr);
      const isToday =
        today.getFullYear() === selected.getFullYear() &&
        today.getMonth() === selected.getMonth() &&
        today.getDate() === selected.getDate();
  
      if (isToday) {
        fetchWeather(weatherBox); // 실시간 날씨
      } else {
        showNoForecast(weatherBox); // 예보 준비중 표시
      }
    }
  });
  
  // 초기 데이터 로딩
  loadFromLocalStorage(); // 로컬스토리지에서 데이터 복원
  fetchWeather(weatherBox); // 페이지 로드 시 날짜도 표시

/*
1. 달력 라이브러리 사용하였음. flatpickr 사용
1-1. 날짜를 받아옴. (선택한 날짜: 이 부분에 날짜 데이터가 들어감)
1-2. 선택한 날짜에 맞게 할 일이 저장됨.

2. 날씨 api 사용하였음.
2-1. 오늘의 날씨만 받아올 수 있음.
2-2. 이외의 날짜를 선택하면 예보 준비중 문구를 띄움.
트러블 슈팅 : 브라우저의 날짜를 보고 판단하기 때문에 내가 다른 날짜로
바꿔도 화면의 전환이 이루어지지 않았음.
> 브라우저의 날짜와 선택한 날짜가 같으면 날씨를 불러오고 다를 경우는
예보 준비중이라고 띄움

3. 오늘의 할일이 list임
3-1. 여기서 일정의 확인이 가능하며 로컬 스토리지를 사용하였음. (새로고침,
브라우저 껐다 켜도 계속 남아있음. 단, 캐시 삭제하면 날아감.)
3-2. modal을 이용한 사이드바 사용. (이름을 누를 경우 나타남)
3-3. 해당 사이드바에서 수정과 삭제 가능함

4. 할일 추가하기
4-1. 입력 후 등록을 누르면 오늘의 할 일에 등록됨.
4-2. 아무것도 입력하지 않으면 경고창 띄움.
*/

    
