const body = document.querySelector("body");
const clockDiv = document.querySelector("#clockplate");
const clockHourSpan = document.querySelector(
  "#clockplate div:first-child span"
);
const clockSperatorSpan = document.querySelector(
  "#clockplate div:nth-child(2) span"
);
const clockMinuteSpan = document.querySelector(
  "#clockplate div:nth-child(3) span"
);
const snowFlakes = document.querySelector("#snowFlakes");
const snowDuration = 60000;
const snowRotate =
  Math.round(
    (720 * ((Math.random() * snowDuration) / 2 + snowDuration / 2)) /
      snowDuration /
      180
  ) * 180;

let CLOCKPLACEWIDTH = 800;
if (window.innerWidth <= 1200) {
  CLOCKPLACEWIDTH = window.innerWidth * 0.75;
}
let CLOCKPLACEHEIGHT = CLOCKPLACEWIDTH * 0.35;

let dayHour = new Date().getHours();
let snowFrequency = 1000 - (800 / 12) * Math.abs(dayHour - 12);
let dynamicStyles = null;

//clock 전반적인 style 설정
clockDiv.style.width = `${CLOCKPLACEWIDTH}px`;
clockDiv.style.height = `${CLOCKPLACEHEIGHT}px`;
document.querySelectorAll("#clock div").forEach((item) => {
  item.style.width = `${(CLOCKPLACEWIDTH / 8) * 3.5}px`;
  item.style.display = "flex";
  item.style.justifyContent = "center";
});
clockSperatorSpan.style.fontFamily = "serif";
document.querySelector("#clockplate div:nth-child(2)").style.width =
  "fit-content";
document.querySelectorAll("#clockplate span").forEach((item) => {
  item.style.fontSize = `${CLOCKPLACEWIDTH * 0.25}px`;
});

//snowfreqency 마다 실행하는 함수: 시간 text로, hour에 따라 배경 색 변화
function clockInterval() {
  const date = new Date();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  clockHourSpan.innerText = `${hour}`;
  clockSperatorSpan.innerText = `:`;
  clockMinuteSpan.innerText = `${minute}`;

  let absDayHourRgb = 200 - (Math.abs(dayHour - 12) / 12) * 200;
  clockDiv.style.background = `linear-gradient(
    135deg,
    rgb(96, 1, 21),
    rgb(${absDayHourRgb}, ${absDayHourRgb}, ${absDayHourRgb}),
    rgb(40, 71, 63)
  )`;
  clockDiv.style.padding = `${CLOCKPLACEHEIGHT * 0.08}px 0px`;
  clockDiv.style.marginTop = `${window.innerHeight * 0.15}px`;
}
clockInterval();
setInterval(clockInterval, snowFrequency);

clockDiv.addEventListener("click", (item) => {
  clockDiv.classList.toggle("rotateX180");
});

//눈내리는 애니메이션 설정
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
        transform: translateY(${
          CLOCKPLACEHEIGHT * 1.1
        }px) rotateY(${snowRotate}deg);
      }
      100%{
        opacity: 100%;
        transform: translateY(${
          CLOCKPLACEHEIGHT * 1.1
        }px) rotateY(${snowRotate}deg);}
    }`);

//눈송이 내리는 함수: 생성, 스타일, 위치, 애니메이션 실행
function clockSnowing() {
  let randomTime = Math.random();
  const snow = document.createElement("i");
  snow.classList = "fa-regular fa-snowflake";
  snow.style.color = `rgba(255,255,255,${0.5 + Math.random() * 0.5})`;
  snow.style.textShadow = "0 1px 10px rgba(0,0,0,0.3)";
  snow.style.fontSize = `${
    ((15 * CLOCKPLACEWIDTH) /
      800 /
      ((randomTime * snowDuration) / 2 + snowDuration / 2)) *
    snowDuration
  }px`;
  snow.style.position = "absolute";
  snow.style.top = `${
    -(CLOCKPLACEHEIGHT / 18) + (randomTime - 0.5) * CLOCKPLACEHEIGHT * 0.35
  }px`;
  snow.style.left = `${
    CLOCKPLACEWIDTH * (1.1 * Math.random()) - CLOCKPLACEWIDTH * 0.05
  }px`;

  snow.style.animation = `snowing ${
    ((randomTime * snowDuration) / 2 + snowDuration / 2) / 2000
  }s ease-in-out forwards`;
  snowFlakes.appendChild(snow);
}

// 브라우저 실행 시 초로 초기 눈송이 형성
function clockSnowingDefault(seconds) {
  let defaultSeconds = 0;
  while (defaultSeconds < (1000 / snowFrequency) * seconds) {
    clockSnowing();
    defaultSeconds += 1;
  }
}

//0초 될 때 눈송이들 전체 사라지는 애니메이션, 2초 후 삭제, 나중에 흩날리는 기능 추가할 수도?
let snowRemainAmount = 0;
function deleteAllSnow() {
  const snowRemain = document.querySelectorAll("#snowFlakes i");
  const date = new Date();
  if (date.getSeconds() === 0 && date.getMilliseconds() <= snowFrequency) {
    snowRemainAmount = snowRemain.length;
    for (let i = 0; i < snowRemainAmount; i++) {
      // const randomMeltingTime = Math.random();
      // let presentYPosition = 0;

      // if (
      //   snowRemain[i].style.animation.split("s")[0] * 0.45 <=
      //   ((snowRemainAmount - i) * snowFrequency) / 1000
      // ) {
      //   presentYPosition = 250;
      // } else {
      //   presentYPosition =
      //     ((((snowRemainAmount - i) / 1000) * snowFrequency) /
      //       snowRemain[i].style.animation.split("s")[0] /
      //       0.45) *
      //     250;
      // // }
      // console.log(presentYPosition);
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

        Math.floor(
          (2000 + snowFrequency - date.getMilliseconds()) / snowFrequency
        ) *
          snowFrequency *
          2
      );
    }
  }
  if (date.getSeconds() === 2 && date.getMilliseconds() <= snowFrequency) {
    for (let j = 0; j < snowRemainAmount; j++) {
      snowRemain[j].remove();
    }
  }
}

clockSnowingDefault(new Date().getSeconds());
setInterval(clockSnowing, snowFrequency);
setInterval(deleteAllSnow, snowFrequency);

//login 창
const login = document.querySelector("#login");
const loginInput = document.querySelector("#login input");
login.style.bottom = `-${CLOCKPLACEHEIGHT * 0.02}px`;
loginInput.style.height = `${CLOCKPLACEHEIGHT * 0.12}px`;
loginInput.style.width = `${CLOCKPLACEWIDTH * 0.5}px`;
loginInput.style.fontSize = `${CLOCKPLACEHEIGHT * 0.12}px`;
console.dir(loginInput);

const ID = "id";

login.addEventListener("submit", (item) => {
  const user_id = loginInput.value;
  localStorage.setItem(ID, user_id);
  if (localStorage.getItem(`${user_id}_todo`) === null) {
    localStorage.setItem(`${user_id}_todo`, JSON.stringify([]));
  }
  loginInput.value = "";
});

//greeting
const todo = document.querySelector("#todo");

if (localStorage.getItem(ID) !== null) {
  login.remove();
  todo.style.opacity = "100%";
  const greetingDiv = document.createElement("div");
  greetingDiv.style.width = "100%";
  greetingDiv.style.display = "flex";
  greetingDiv.style.justifyContent = "center";
  const greeting = document.createElement("span");
  greeting.style.position = "absolute";
  // greeting.style.top = `-${CLOCKPLACEHEIGHT * 0.06}px`;
  greeting.style.fontFamily = "Kalnia, serif";
  greeting.style.cursor = "pointer";
  greeting.style.fontSize = `${CLOCKPLACEHEIGHT * 0.12}px`;
  greeting.style.top = "0px";
  let absDayHourRgb = 100 - (Math.abs(dayHour - 12) / 12) * 100;
  greeting.style.color = `rgb(${absDayHourRgb},${absDayHourRgb},${absDayHourRgb})`;

  const userLoggedinId = localStorage.getItem(ID);
  const dateHour = new Date().getHours();
  if (dateHour < 6) {
    greeting.innerText = `Hello. ${userLoggedinId}. How about sleep?`;
  } else if (dateHour < 9) {
    greeting.innerText = `Hello. ${userLoggedinId}. Good morning!`;
  } else if (dateHour < 11) {
    greeting.innerText = `Hello. ${userLoggedinId}. How are you?`;
  } else if (dateHour < 13) {
    greeting.innerText = `Hello. ${userLoggedinId}. Lunch time!`;
  } else if (dateHour < 18) {
    greeting.innerText = `Hello. ${userLoggedinId}. Good afternoon!`;
  } else if (dateHour < 22) {
    greeting.innerText = `Hello. ${userLoggedinId}. Good evening!`;
  } else {
    greeting.innerText = `Hello. ${userLoggedinId}. How was your day?`;
  }
  greetingDiv.appendChild(greeting);
  todo.appendChild(greetingDiv);

  greeting.addEventListener("click", () => {
    localStorage.removeItem(ID);
    window.location.reload();
  });
}

//todo
const todoform = document.querySelector("#todo div form");
const todoInput = document.querySelector("#todo div form input");
const todoListWork = document.createElement("h1");
todoListWork.style.fontSize = `${CLOCKPLACEHEIGHT * 0.12}px`;
todoListWork.style.fontWeight = "bold";
todoListWork.style.marginBottom = "20px";
todoListWork.innerText = "Work";

todoform.parentNode.prepend(todoListWork);

todo.style.marginTop = `${CLOCKPLACEHEIGHT * 0.12}px`;
todo.style.height = `${(window.innerHeight - CLOCKPLACEHEIGHT) * 0.6}px`;
todo.style.paddingTop = `${CLOCKPLACEHEIGHT * 0.2}px`;
todoInput.style.fontSize = `${CLOCKPLACEHEIGHT * 0.1}px`;
todoInput.placeholder = `${todoListWork.innerText} to do?`;

//todo
function saveTodo(event) {
  let todoList = [];
  event.preventDefault();
  const todoItem = event.target.childNodes[0].value;
  const todoId = Date.now();
  const userId = localStorage.getItem(ID);
  const todoObj = {
    id: todoId,
    todo: todoItem,
  };
  todoList = JSON.parse(localStorage.getItem(`${userId}_todo`));
  if (todoList === null) {
    todoList = [];
  }
  let parsedTodoList = todoList;
  console.log(parsedTodoList);
  parsedTodoList.push(todoObj);
  console.log(todoObj);
  localStorage.setItem(`${userId}_todo`, JSON.stringify(parsedTodoList));
  event.target.childNodes[0].value = "";

  localStorage;
  console.dir(event);
  paintTodo();
}
function paintTodo(event) {
  const todos = JSON.parse(
    localStorage.getItem(`${localStorage.getItem(ID)}_todo`)
  );
  const todoBox = document.querySelector(".todoBox");
  todoBox.querySelectorAll("ul").forEach((item) => {
    item.remove();
  });
  todos.forEach((item) => {
    const ul = document.createElement("ul");
    ul.id = item.id;
    const li = document.createElement("li");
    li.innerText = item.todo;
    const remove = document.createElement("i");
    remove.className = "fa-solid fa-trash-can";
    remove.addEventListener("click", deleteTodo);

    ul.appendChild(li);
    ul.appendChild(remove);
    todoBox.appendChild(ul);
  });
}

function deleteTodo(event) {
  console.dir(event);
  let todoList = [];
  const userId = localStorage.getItem(ID);
  todoList = JSON.parse(localStorage.getItem(`${userId}_todo`));
  todoList = todoList.filter((item) => {
    return item.id !== parseInt(event.target.parentNode.id);
  });
  localStorage.setItem(`${userId}_todo`, JSON.stringify(todoList));
  event.target.parentNode.remove();
}
paintTodo();

todoform.addEventListener("submit", saveTodo);
