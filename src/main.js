const $target = document.querySelector(".clothes");

let state = { clothes: [], filteredClothes: []};

const setState = (newState) => {
  state = {...state, ...newState};
  render();
}

// 인수로 데이터를 넘겨받을 필요없이 밖에서 선언한 state 가져와서 사용하기. 왜?
const render = () => {
  const { filteredClothes } = state;
  $target.innerHTML = `${filteredClothes.map(({color, type, gender, size, imgUrl}) => {
    return `<li class="cloth">
            <img class="item__thumnail" src="${imgUrl}" alt="${color} ${type}">
            <span class="item__description">${gender}, ${size}</span>
        </li>`
  }).join('')}`
};

// event delegation: closest 사용. 
// https://ko.javascript.info/event-delegation
document.querySelector("nav").addEventListener("click", e => {
  const button = e.target.closest('BUTTON');
  if (!button) {
    return;
  }
  const filter = button.dataset.filter;
  const selectedValue = button.dataset[filter];
  const { clothes } = state;
  //filter는 순수함수?
  const filteredClothes = clothes.filter(cloth => cloth[filter] === selectedValue);
  // render를 바로 호출하지 말고! 근데 왜??
  setState({ filteredClothes });
})

const loadClothes = async () => {
  try {
    const response = await fetch('/data/data.json'); 
    const { clothes } = await response.json(); // response의 body를 json object로 변환
    setState({ clothes, filteredClothes: clothes });
  }catch(e) {
    console.error(e);
  }
}

//render();
loadClothes(); // 최상위레벨에서 await 사용할 수 없음(node.js 최신버전은 가능) => 호출 후 다음 처리할 게 없으면 이렇게 호출해도 될듯


