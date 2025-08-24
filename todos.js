// todos.js

// 날짜별 할 일 데이터를 저장할 객체
let todoData = {};
// 현재 선택된 날짜 (key로 쓰임)
let selectedDate = null;
// 사이드바에서 수정/삭제할 대상 (수정/삭제용으로 클릭된 <li> 요소를 임시 저장)
let currentLi = null;

// 선택한 날짜를 설정하는 함수
export function setSelectedDate(date) {
  selectedDate = date;
}

// 현재 선택된 날짜를 가져오는 함수
export function getSelectedDate() {
  return selectedDate;
}

// 저장된 투두 데이터를 로컬스토리지에서 불러오기
export function loadFromLocalStorage() {
  const saved = localStorage.getItem('todo-data');
  if (saved) {
    todoData = JSON.parse(saved); // JSON 문자열 → 객체로 변환
  }
}

// 현재 todoData를 로컬스토리지에 저장하기
export function saveToLocalStorage() {
  localStorage.setItem('todo-data', JSON.stringify(todoData));
}

// 목록 전체 다시 그림
export function renderTodos(todoList, sidebar, editInput) {
  todoList.innerHTML = ''; // 기존 목록 비우기
  // 선택된 날짜가 없거나, 해당 날짜에 할 일이 없으면 렌더링 종료
  if (!selectedDate || !todoData[selectedDate]) return;

  // 선택된 날짜에 등록된 모든 할 일을 순회
  todoData[selectedDate].forEach((item, index) => {
    const li = document.createElement('li'); // <li> 항목 생성
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox'; // 체크박스 생성
    checkbox.checked = item.done; // 완료 상태 반영

    const span = document.createElement('span');
    span.textContent = item.text; // 텍스트 출력
    span.style.marginLeft = '8px';
    if (item.done) span.classList.add('done'); // 완료 시 스타일 적용

    // ✅ 체크박스를 클릭했을 때 처리
    checkbox.addEventListener('change', () => {
      item.done = checkbox.checked;
      span.classList.toggle('done', checkbox.checked); // 텍스트 스타일 갱신
      saveToLocalStorage(); // 상태 저장
    });
    // ✅ 할 일 클릭 시 사이드바 열기
    li.appendChild(checkbox);
    li.appendChild(span);
    li.addEventListener('click', () => {
      currentLi = li; // 클릭한 항목을 임시 저장
      editInput.value = item.text; // 텍스트 박스에 내용 표시
      sidebar.classList.add('active'); // 사이드바 열기
      currentLi.dataset.index = index; // 수정용 인덱스 기록
    });

    todoList.appendChild(li); // 리스트에 추가
  });
}

// 할 일 추가
export function addTodo(value) {
  if (!todoData[selectedDate]) todoData[selectedDate] = []; // 날짜 없으면 배열 생성
  todoData[selectedDate].push({ text: value, done: false }); // 새 할 일 추가
  saveToLocalStorage(); // 저장
}

// 할 일 수정
export function editTodo(editInput, sidebar) {
  if (currentLi && selectedDate) {
    const index = currentLi.dataset.index; // 클릭된 항목의 인덱스
    todoData[selectedDate][index].text = editInput.value.trim(); // 수정
    sidebar.classList.remove('active'); // 사이드바 닫기
    saveToLocalStorage();
  }
}

// 할 일 삭제
export function deleteTodo(sidebar) {
  if (currentLi && selectedDate) {
    const index = currentLi.dataset.index; // 클릭된 항목의 인덱스
    todoData[selectedDate].splice(index, 1); // 삭제
    sidebar.classList.remove('active'); // 사이드바 닫기
    saveToLocalStorage();
  }
}
