# MINI CLOTH SHOP

드림코딩 아카데미(https://academy.dream-coding.com/)의 쇼핑몰 미니게임 클론코딩 실습

html + css + javascript + fetch json data

---

## 진행과정

1. 영상에서 구현 결과물을 확인하고 이미지 리소스를 다운로드 받았다.
2. 스스로 만들어보았다.
3. 이벤트 처리를 리팩토링했다(이벤트 위임).
4. 강의 영상을 보고 추가 리팩토링했다.

- 데이터 파일 분리 + fetch로 데이터 가져오기
- 데이터 필터링하고 렌더링을 다시 하는 대신 스타일 속성 `display: none;` 사용해서 원하는 결과만 보여주기
- `<img>` 하위요소를 가진 `<button>` 의 이벤트 처리는 img에서 하도록 수정(dataset을 `<img>`에 세팅)

---

## 고민하고 배운 것들

### 1. 이벤트 버블링과 이벤트 위임 Event Bubbling and Event Delegation

어떤 요소에 대한 이벤트가 발생하면

1. `window -> document -> html -> body ... -> target element` 까지 다다를 때까지 상위요소->하위요소 순으로 이벤트가 전파된 후(이벤트 캡쳐링)
2. 실제 이벤트가 발생한 타깃 요소에 이벤트가 전달되어 등록된 이벤트 핸들러가 실행되고
3. `target element -> ... -> body -> html -> document -> window` 순으로 다시 상위 요소를 타고 이벤트가 전파되며(이벤트 버블링)
   각 요소에 등록된 이벤트 핸들러가 실행된다.
   (`addEventListener` 에서 `capture` 옵션을 `true` 로 설정하면 캡쳐링 단계에서 이벤트 핸들러 실행)

따라서 동일한 하위 요소 여러 개에 같은 이벤트 처리를 해야 할 경우
개별 요소 하나하나에 이벤트 등록을 할 필요없이 이 요소들의 공통 부모가 되는 요소에 이벤트를 등록하는 것이 이벤트 위임.

이번 실습에서는 이미지로 된 버튼에서 이벤트가 제대로 동작하지 않는 문제가 있었다.

```html
<button><img /></button>
```

요런 구조이고 button과 img 가 차지하는 영역은 동일. 그래서 버튼을 클릭해도 이벤트 타깃은 항상 이미지가 된다.
이럴 경우 내가 찾은 방법은 아래와 같이 타깃 요소에서 가장 가까이 있는 버튼을 찾는 것이었다.

```javascript
const button = event.target.closest('BUTTON');
```

그런데 엘리님 코드를 보니 굳이 버튼을 찾지 않고 이벤트 자체를 img에서 처리할 수도 있겠더라.
버튼 이벤트에서 하는 일은 사용자가 클릭한 버튼에 따라서 제품 리스트를 필터링하는 것이었고,
필터링 기준이 될 값은 타깃 요소의 dataset에 세팅되어 있다.
dataset을 버튼이 아니라 이미지 요소에 넣어두면 굳이 버튼을 찾지 않아도 된다.

### 2. 데이터 상태관리

나는 리액트의 state 관리방식을 모방하여 fetch한 데이터를 state에 담고 state가 변경될 때마다 리스트가 다시 렌더링되도록 했다.
그런데 필터링 버튼을 클릭할 때마다 state에 있는 데이터를 변경하니 필터링하지 않은 원본 데이터로 다시 되돌릴 수가 없었다.
결국 임시방편으로 state에 원본 데이터는 원본대로 가지고 있고, 필터링용 리스트 데이터를 하나 더 저장하도록 수정했다.
하지만 비슷한 데이터를 굳이 둘씩 들고 있는 게 좋은 방법은 아닌 것 같다.
그러면 이렇게 데이터 조회 결과를 필터링할 때는 상태 관리를 어떻게 하는걸까? 매번 새로 fetch를 하나?
이번 실습에서는 데이터 변경 및 렌더링은 한번만 하고 display 속성만 none으로 바꾸는 식으로 리팩토링했다.
다른 효율적인 방법이 또 있는지 궁금하다.

-> 생각해보니 리스트가 변경될 때마다 렌더링을 다시 하는 것보다 필터링 값(key, value)가 바뀔 때마다 렌더링을 다시 하는 게 낫겠다.

```javascript
// before

let state = { clothes: [], filteredClothes: [] };

const onButtonClick = (event) => {
  const key = event.target.dataset.key;
  const value = event.target.dataset.value;
  const filteredClothes = clothes.filter(
    (cloth) => cloth[filter] === selectedValue
  );
  setState({ filteredClothes }); // 필터링한 데이터를 state에 저장
};

const render = () => {
  const { filteredClothes } = state;
  const $target = document.querySelector('.clothes');
  $target.innerHTML = `${filteredClothes
    .map((cloth) => createHTMLString(cloth))
    .join('')}`;
};
```

```javascript
// after

let state = { clothes: [], key: '', value: '' };

const onButtonClick = (event) => {
  const key = event.target.dataset.key;
  const value = event.target.dataset.value;
  setState({ key, value }); // 데이터를 필터링할 조건값을 state에 저장
};

const render = () => {
  const { clothes, key, value } = state;
  // key나 value가 없으면 clothes를 그대로 사용
  const filteredClothes =
    !key || !value ? clothes : clothes.filter((cloth) => cloth[key] === value);
  const $target = document.querySelector('.clothes');
  $target.innerHTML = `${filteredClothes
    .map((cloth) => createHTMLString(cloth))
    .join('')}`;
};
```

그리고 `filter`를 비롯한 몇몇 Array 메서드가 원본 배열을 변경(mutate)하지 않고 조건에 맞는 값만 배열로 반환한다는 것을 기억하자.
functional programming에 대한 개념도 조금씩 익혀봐야겠다.

---

### 참조

- [모던 자바스크립트 튜토리얼 - 버블링과 캡처링](https://ko.javascript.info/bubbling-and-capturing)
- [모던 자바스크립트 튜토리얼 - 이벤트 위임](https://ko.javascript.info/event-delegation)
- [PoiemaWeb - 배열 고차 함수](https://poiemaweb.com/js-array-higher-order-function)
