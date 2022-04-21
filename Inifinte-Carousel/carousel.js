const carouselBox = document.querySelector(".carousel-box");
const carousel = document.querySelector(".carousel");

/* carousel의 left, front, right인 index 배열을 반환하는 함수 */
/* indexArr = [former(next) left, left, front, right, next(former) right] */
let carouselIndexer = (function () {
  const itemCounts = carousel.children.length;
  let indexArr = [itemCounts - 2, itemCounts - 1, 0, 1, 2]
  // 다음 carousel(next): +1, 이전 carousel(prev): -1
  return function (step) {
    step = step === "next" ? 1
      : step === "prev" ? -1
        : undefined;

    for (let i = 0; i < indexArr.length; i++) {
      indexArr[i] = ((indexArr[i] + step) % itemCounts + itemCounts) % itemCounts;
    }
    return indexArr
  }

})();

/* 반환된 새 indexArr를 바탕으로 carousel items의 index를 바꾸는 함수 */
function classUpdater(element, position) {
  switch (position) {
    case 0:   // former(next) left
      element.classList.remove("left");
      break;
    case 1:   // left
      element.classList.add("left");
      element.classList.remove("main");
      break;
    case 2:   // front
      element.classList.remove("left");
      element.classList.remove("right");
      element.classList.add("main");
      break;
    case 3:   // right
      element.classList.remove("main");
      element.classList.add("right");
      break;
    case 4:   // next(former) right
      element.classList.remove("right");
      break;
  }
}

function carouselSlider(e) {
  if (e !== undefined && !e.target.classList.contains("manipulation")) return;

  const carouselList = Array.from(carousel.children);
  let step = e !== undefined && e.target.matches("#previous") ? "prev" : "next";
  let indexArr = carouselIndexer(step);

  for (i = 0; i < indexArr.length; i++) {
    classUpdater(carouselList[indexArr[i]], i);
  }
}

/* 애니메이션 시간보다 짧은 간격의 클릭을 막아 애니메이션이 자연스러울 수 있도록 함 */
let throttle = (function () {
  let throttling = false;

  /* func(콜백함수, throttling 시간, 콜백함수의 parameter) */
  return function (callback, throttleTime, ...arg) {

    if (!throttling) {
      throttling = true;
      callback(...arg);
      setTimeout(() => { throttling = false }, throttleTime)
    }
  }
})()

/* TODO: 일정 시간마다 자동으로 carousel을 넘기고, 사용자가 클릭을 하면 자동으로 넘기지 않도록 하는 기능 */
carouselBox.addEventListener("click", (e) => { throttle(carouselSlider, 250, e) })

setInterval(() => { carouselSlider() }, 2000);


