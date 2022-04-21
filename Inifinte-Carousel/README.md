## Infinite Carousel  
요소 양 끝의 화살표를 누르면 다음 이미지, 요소를 보여주는 웹페이지 요소입니다.  
[Infinite Carousel](https://htmlpreview.github.io/?https://github.com/ksheer506/HTML-tutorial/blob/main/Inifinte-Carousel/carousel.html)
<br/><br/>
1. HTML에 별도의 클론 element 없이 무한히 스크롤할 수 있도록 함
2. carousel item 전환 애니메이션 시간 내에 화살표를 여러번 눌러 carousel이 넘어가게 될 경우 throttle을 이용해 애니메이션 속도를 조절
  
<br/><br/>
(2022. 4. 21.)  
1. carousel items의 위치를 결정하기 위한 배열 indexArr에서 쓰이지 않는 부분은 삭제해 indexArr의 크기를 carousel items의 개수 N에서 5로 줄임  
  
**[개선 전]**
```javascript
  const itemNumber = carousel.children.length;
  let indexArr = new Array(itemNumber).fill(0).map((el, index) => index)
```  

  
  **[개선 후]**
```javascript
  const itemCounts = carousel.children.length;
  let indexArr = [itemCounts - 2, itemCounts - 1, 0, 1, 2]
```
<br/><br/>
2. carouselList.forEach()를 for문(iteration 횟수 = indexArr.length)로 바꿔  불필요한 연산 횟수를 줄임  

**[개선 전]**
```javascript
carList.forEach((el, index) => {
        classModifier(el, indexArr[index], carList.length)
      })
```  


  **[개선 후]**
```javascript
for (i = 0; i < indexArr.length; i++) {
    classUpdater(carouselList[indexArr[i]], i);
  }
```


