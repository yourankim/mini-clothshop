const clothes = [
  {
    color: "pink",
    type: "tshirt",
    gender: "female",
    size: "small"
  },
  {
    color: "yellow",
    type: "tshirt",
    gender: "female",
    size: "small"
  },
  {
    color: "blue",
    type: "tshirt",
    gender: "female",
    size: "small"
  },
   {
    color: "pink",
    type: "tshirt",
    gender: "female",
    size: "large"
  },
  {
    color: "yellow",
    type: "tshirt",
    gender: "female",
    size: "large"
  },
  {
    color: "blue",
    type: "tshirt",
    gender: "female",
    size: "large"
  },
   {
    color: "pink",
    type: "tshirt",
    gender: "male",
    size: "small"
  },
  {
    color: "yellow",
    type: "tshirt",
    gender: "male",
    size: "small"
  },
  {
    color: "blue",
    type: "tshirt",
    gender: "male",
    size: "small"
  },
   {
    color: "pink",
    type: "skirt",
    gender: "female",
    size: "small"
  },
  {
    color: "yellow",
    type: "skirt",
    gender: "female",
    size: "small"
  },
  {
    color: "blue",
    type: "skirt",
    gender: "female",
    size: "small"
  },
   {
    color: "pink",
    type: "pants",
    gender: "female",
    size: "small"
  },
  {
    color: "yellow",
    type: "pants",
    gender: "female",
    size: "small"
  },
  {
    color: "blue",
    type: "pants",
    gender: "female",
    size: "small"
  },
     {
    color: "pink",
    type: "pants",
    gender: "male",
    size: "large"
  },
  {
    color: "yellow",
    type: "pants",
    gender: "male",
    size: "large"
  },
  {
    color: "blue",
    type: "pants",
    gender: "male",
    size: "small"
  },
]; 

const getClothImageUri = (color, type) => {
  return `./imgs/${color}_${type.slice(0,1)}.png`;
}

const $target = document.querySelector(".clothes");

let state = { clothes, filteredClothes:clothes };

const setState = (newState) => {
  state = {...state, ...newState};
  render();
}

// 인수로 데이터를 넘겨받을 필요없이 밖에서 선언한 state 가져와서 사용하기. 왜?
const render = () => {
  const { filteredClothes } = state;
  $target.innerHTML = `${filteredClothes.map(({color, type, gender, size}) => {
    return `<li>
      <div class="cloth-img"><img src='${getClothImageUri(color, type)}'/></div>
      <span> ${gender}, ${size} </span>
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


render();


