  const carouselBox = document.querySelector(".carousel-box");
    const carousel = document.querySelector(".carousel");

    /* carousel의 left: (carousel 개수 - 1), front: 0, right: 1인 배열을 반환하는 함수 */
    let carouselIndexer = (function (step) {
      const itemNumber = carousel.children.length;
      let indexArr = new Array(itemNumber).fill(0).map((el, index) => index)

      // 다음 carousel(next): -1, 이전 carousel(prev): 1
      return function (step) {
        step = step === "next" ? -1
          : step === "prev" ? 1
            : undefined;

        for (let i = 0; i < indexArr.length; i++) {
          indexArr[i] = ((indexArr[i] + step) % itemNumber + itemNumber) % itemNumber;
        }
        return indexArr
      }

    })();

    /* 반환된 새 indexArr를 바탕으로 carousel items의 index를 바꾸는 함수 */
    function classModifier(element, newIndex, itemCounts) {
      switch (newIndex) {
        case itemCounts - 2:
          element.classList.remove("left");
          break;
        case itemCounts - 1:
          element.classList.add("left");
          element.classList.remove("main");
          break;
        case 0:
          element.classList.remove("left");
          element.classList.remove("right");
          element.classList.add("main");
          break;
        case 1:
          element.classList.remove("main");
          element.classList.add("right");
          break;
        case 2:
          element.classList.remove("right");
          break;
      }
    }

    function carouselSlide(e) {
      if (!e.target.classList.contains("manipulation")) return;

      const carList = Array.from(carousel.children);
      let step = e.target.matches("#previous") ? "prev" : "next";
      let indexArr = carouselIndexer(step);

      carList.forEach((el, index) => {
        classModifier(el, indexArr[index], carList.length)
      })
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

    carouselBox.addEventListener("click", (e) => { throttle(carouselSlide, 250, e) })
