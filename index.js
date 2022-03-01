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

const state = { clothes: clothes};

const $target = document.querySelector(".clothes");

const render = (clothes) => {
  $target.innerHTML = `${clothes.map(({color, type, gender, size}) => {
    return `<li>
      <div class="cloth-img"><img src='${getClothImageUri(color, type)}'/></div>
      <span> ${gender}, ${size} </span>
    </li>`
  }).join('')}`
};

const setState = (newState) => {
  state = {state, newState};
  console.log(state);
  render(state.clothes);
}

const filterByClothButtons = document.querySelectorAll(".cloth-btn");
filterByClothButtons.forEach(button => {
  button.addEventListener("click", e => {
    const type = e.target.dataset.type;
    const filteredResult = state.clothes.filter(cloth => cloth.type === type);
    render(filteredResult); 
  }); 
});

const filterByColorButtons = document.querySelectorAll(".color-btn");
filterByColorButtons.forEach(button => {
  button.addEventListener("click", e => {
    const color = e.target.dataset.color;
    const filteredResult = state.clothes.filter(cloth => cloth.color === color);
    render(filteredResult); 
  }); 
});

render(clothes);


