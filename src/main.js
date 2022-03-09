let state = { clothes: [], key: '', value: '' };

const setState = (newState) => {
  state = {...state, ...newState};
  render();
}

const render = () => {
  const { filteredClothes } = state;
  const $target = document.querySelector(".clothes");
  $target.innerHTML = `${filteredClothes.map((cloth) => createHTMLString(cloth)).join('')}`
};

const createHTMLString = (cloth) => {
  const { color, type, gender, size, imgUrl} = cloth;
  return `<li class="cloth"  data-color=${color} data-type=${type}>
            <img class="item__thumnail" src="${imgUrl}" alt="${color} ${type}"/>
            <span class="item__description">${gender}, ${size}</span>
        </li>`;
}

const setEventListener = () => {
  const $logo = document.querySelector('.logo');
  const $btns= document.querySelector('.btns');
  
  $logo.addEventListener('click', e => setState({ filteredClothes: state.clothes }));
  $btns.addEventListener("click", e => onButtonClick(e));
}

const onButtonClick = (event) => {
  const key = event.target.dataset.key;
  const value = event.target.dataset.value;
  if(!key || !value) {
    return;
  }
  filterClothes(key, value);
}

// state 업데이트해서 리렌더링하는 대신 display 속성만 변경하기
const filterClothes = (key, value) => {
  const clothes = document.querySelectorAll('.cloth');
  clothes.forEach(cloth => {
    if (cloth.dataset[key] === value) {
      cloth.classList.remove('invisible');
    } else {
      cloth.classList.add('invisible');
    }
  });
}

const loadClothes = async () => {
  try {
    const response = await fetch('/data/data.json'); 
    const { clothes } = await response.json(); // response의 body를 json object로 변환
    setState({ clothes, filteredClothes: clothes });
  }catch(e) {
    console.error(e);
  }
}

setEventListener();
loadClothes(); // 최상위레벨에서 await 사용할 수 없음(node.js 최신버전은 가능) => 호출 후 다음 처리할 게 없으면 이렇게 호출해도 될듯


