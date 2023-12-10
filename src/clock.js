const body = document.querySelector("body");
const clockDiv = document.querySelector("#clock");
const clockSpan = document.querySelector("#clock span");
const CLOCKPLACE = 650;
const snowDuration = 15;
const snowFrequency = 2;
let dynamicStyles = null;

clockDiv.style.width = `${CLOCKPLACE}px`;

function clockInterval() {
  const date = new Date();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  clockSpan.innerText = `${hour} : ${minute}`;
}
clockInterval();
setInterval(clockInterval, 1000);

function addAnimation(body) {
  if (!dynamicStyles) {
    dynamicStyles = document.createElement("style");
    dynamicStyles.nodeType = "text/css";
    document.head.appendChild(dynamicStyles);
  }

  dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}

function clockSnowing() {
  let randomTime = Math.random();
  const snow = document.createElement("i");
  const snowRotate =
    Math.round(
      (720 * ((randomTime * snowDuration) / 2 + snowDuration / 2)) /
        snowDuration /
        180
    ) * 180;
  const snowRange = -20 + (randomTime - 0.5) * 60;
  console.log(snowRotate, snowRange);
  snow.classList = "fa-regular fa-snowflake";
  snow.style.color = `rgba(255,255,255,${0.5 + Math.random() * 0.5})`;
  snow.style.textShadow = "0 1px 10px rgba(0,0,0,0.3)";
  snow.style.fontSize = `${
    (15 / ((randomTime * snowDuration) / 2 + snowDuration / 2)) * snowDuration
  }px`;
  snow.style.position = "absolute";
  snow.style.top = `${snowRange}px`;
  snow.style.left = `${
    CLOCKPLACE * 0.05 + CLOCKPLACE * (0.9 * Math.random())
  }px`;
  addAnimation(`@keyframes snowing {
      0% {
        opacity: 0%;
      }
      5% {
        opacity: 100%;
      }
      45% {
        opacity: 100%;
        transform: translateY(250px) rotateY(${snowRotate}deg);
      }
      95% {
        opacity: 100%;
        transform: translateY(250px) rotateY(${snowRotate}deg);
      }
      100%{
        opacity: 100%;
        transform: translateY(250px) rotateY(${snowRotate}deg);}
    }`);
  snow.style.animation = `snowing ${
    (randomTime * snowDuration) / 2 + snowDuration / 2
  }s ease-in-out forwards`;
  clockDiv.appendChild(snow);
}
function deleteSnow() {
  const snowMelten = document.querySelector("#clock i:nth-child(2)");
  console.log(snowMelten);
  snowMelten.remove();
  setTimeout(deleteSnow, snowFrequency * 100);
}
clockSnowing();
console.log(clockDiv.childNodes[2]);
setInterval(clockSnowing, snowFrequency * 100);
setTimeout(deleteSnow, snowDuration * 4000);

// let timer2 = setTimeout(function knock() {
//   console.log("똑똑똑");
//   timerId = setTimeout(knock, 1000);
// }, 7000);
