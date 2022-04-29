let focus = document.createElement("focus-highlight");
document.body.appendChild(focus);

function showFocus(e) {
  const currentEle = e.target;
  const styles = {
    left: `${currentEle.offsetLeft}px`,
    top: `${currentEle.offsetTop}px`,
    width: `${currentEle.offsetWidth}px`,
    height: `${currentEle.offsetHeight}px`,
    borderRadius: getComputedStyle(currentEle).borderRadius
  }

  focus.style.border = "2px solid rgb(228, 84, 108)";
  for (const prop in styles) {
    focus.style[prop] = styles[prop];
  }
}

function hideFocus(e) {
  const styles = {
    left: "0px",
    top: "0px",
    width: "0px",
    height: "0px",
    border: "0px"
  }
  for (const prop in styles) {
    focus.style[prop] = styles[prop];
  }
}
document.addEventListener("focusin", (e) => {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Tab") {
      showFocus(e)
    };
  })
})

window.addEventListener("blur", (e) => {
  console.log(e);
  hideFocus(e);
})


