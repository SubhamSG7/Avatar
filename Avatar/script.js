let name = document.querySelector(".input");
let addUser = document.querySelector(".avatar");
let model = document.querySelector("#model");
let addBtn = document.querySelector("#add");
let closeBtn = document.querySelector("#close");
let inputValue = document.querySelector(".input");
let avatarContainer = document.querySelector(".avatarContainer");

let avatarArr = [];
let alertDiv;

addUser.addEventListener("click", handleAddUser);
addBtn.addEventListener("click", handleAdd);
closeBtn.addEventListener("click", handleclose);

function handleclose() {
  model.classList.remove("model");
  model.classList.add("dnone");
}
function handleAdd() {
  let inputData = inputValue.value;
  let newAvatar = document.createElement("div");
  newAvatar.innerHTML = `<i class="fa-solid fa-xmark" onclick="handleAlert(event)"></i><p>${inputData[0].toUpperCase()}</p>`;
  const r = randomBetween(0, 255);
  const g = randomBetween(0, 255);
  const b = randomBetween(0, 255);
  newAvatar.style.backgroundColor = `rgb(${r},${g},${b})`;
  newAvatar.classList.add("newAvatar");
  avatarArr.push(newAvatar);
  inputValue.value = "";
  render(avatarArr);
}
function handleAddUser() {
  model.classList.remove("dnone");
  model.classList.add("model");
}
const randomBetween = (min, max) =>
  min + Math.floor(Math.random() * (max - min + 1));

function render(arr) {
  avatarContainer.innerHTML = "";
  arr.map((val) => {
    avatarContainer.append(val);
  });
  model.classList.remove("model");
  model.classList.add("dnone");
}
function handleAlert(e) {
  let elementToRemove = e.target.parentElement;
  let parent = elementToRemove.parentElement.children;
  let index = 0;
  for (i = 0; i < parent.length; i++) {
    if (elementToRemove === parent[i]) index = i;
  }
  alertDiv = document.createElement("div");
  alertDiv.innerHTML = `<div class="deleteAlert"><p class="alertPara">You Sure To Delete<p><button onclick="handleRemove(${index})">Sure</button><button onclick="handleHide()">Nope</button></div>`;
  avatarContainer.append(alertDiv);
}
function handleHide() {
  alertDiv.classList.add("dnone");
}
function handleRemove(elementIndex) {
  console.log(elementIndex);
  let returnedArr = [];
  returnedArr = avatarArr.filter((val, index) => {
    return index !== elementIndex;
  });
  avatarArr = returnedArr;
  render(avatarArr);
}
