const body = document.querySelector("body");
const clockDiv = document.querySelector("#clock");
const clockSpan = document.querySelector("#clock span");
const snowFlakes = document.querySelector("#snowFlakes");
const CLOCKPLACE = 800;
const snowDuration = 60000;
const snowRotate =
  Math.round(
    (720 * ((Math.random() * snowDuration) / 2 + snowDuration / 2)) /
      snowDuration /
      180
  ) * 180;

let dayHour = new Date().getHours();
let snowFrequency = 1000 - (800 / 12) * Math.abs(dayHour - 12);
let dynamicStyles = null;
console.log(dayHour, snowFrequency);
clockDiv.style.width = `${CLOCKPLACE}px`;

function clockInterval() {
  const date = new Date();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  clockSpan.innerText = `${hour} : ${minute}`;
}
clockInterval();
setInterval(clockInterval, snowFrequency);

function addAnimation(body) {
  if (!dynamicStyles) {
    dynamicStyles = document.createElement("style");
    dynamicStyles.nodeType = "text/css";
    document.head.appendChild(dynamicStyles);
  }

  dynamicStyles.sheet.insertRule(body, dynamicStyles.length);
}

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

function clockSnowing() {
  let randomTime = Math.random();
  const snow = document.createElement("i");
  const snowRange = -20 + (randomTime - 0.5) * 70;
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

  snow.style.animation = `snowing ${
    ((randomTime * snowDuration) / 2 + snowDuration / 2) / 2000
  }s ease-in-out forwards`;
  snowFlakes.appendChild(snow);
}

function clockSnowingDefault(seconds) {
  let defaultSeconds = 0;
  while (defaultSeconds < (1000 / snowFrequency) * seconds) {
    clockSnowing();
    defaultSeconds += 1;
  }
}

// function deleteSnow() {
//   const snowMelten = document.querySelector("#clock i:nth-child(2)");
//   console.log(snowMelten);
//   snowMelten.remove();
//   setTimeout(deleteSnow, snowFrequency);
// }
let snowRemainAmount = 0;
function deleteAllSnow() {
  const snowRemain = document.querySelectorAll("#snowFlakes i");
  const date = new Date();
  console.log(date.getSeconds(), date.getMilliseconds());
  if (date.getSeconds() === 0 && date.getMilliseconds() <= snowFrequency) {
    console.log("animate");
    snowRemainAmount = snowRemain.length;
    for (let i = 0; i < snowRemainAmount; i++) {
      const randomMeltingTime = Math.random();
      let presentYPosition = 0;

      if (
        snowRemain[i].style.animation.split("s")[0] * 0.45 <=
        ((snowRemainAmount - i) * snowFrequency) / 1000
      ) {
        presentYPosition = 250;
      } else {
        presentYPosition =
          ((((snowRemainAmount - i) / 1000) * snowFrequency) /
            snowRemain[i].style.animation.split("s")[0] /
            0.45) *
          250;
      }
      console.log(presentYPosition);
      snowRemain[i].animate(
        [
          {
            opacity: `${snowRemain[i].style.opacity}`,
            // transform: `translateX(0px) translateY(${presentYPosition}px) rotateY(${snowRotate}deg)`,
          },
          {
            opacity: "0%",
            // transform: `translateX(${
            //   (Math.random() - 0.5) * 100
            // }px) translateY(${
            //   presentYPosition + Math.random() * 10
            // }px) rotateY(${snowRotate}deg)`,
          },
          ,
        ],
        2000 * 2 + snowFrequency
      );
    }
  }
  if (date.getSeconds() === 2 && date.getMilliseconds() <= snowFrequency) {
    console.log("remove all");
    console.log(snowRemainAmount);
    for (let j = 0; j < snowRemainAmount; j++) {
      console.dir(snowRemain);
      snowRemain[j].remove();
    }
  }
}

clockSnowingDefault(new Date().getSeconds());
setInterval(clockSnowing, snowFrequency);
// setTimeout(deleteSnow, snowDuration);
setInterval(deleteAllSnow, snowFrequency);
