let submitBtn = document.querySelector(".submit");

let tableBody = document.querySelector(".tbody");
let idToEdit;
submitBtn.addEventListener("click", handleSubmit);
let usersArr = localStorage.getItem("usersArr");
if (usersArr) {
  render(usersArr);
}
function handleSubmit(event) {
  event.preventDefault();
  let taskName = document.querySelector("#taskName").value;
  let taskStatus = document.querySelector("#taskStatus").value;
  if (handleValidation(taskName, taskStatus)) {
    if (submitBtn.value != "Update") {
      if (usersArr) {
        let parseArr = JSON.parse(usersArr);
        parseArr.push({ taskName, taskStatus });
        localStorage.setItem("usersArr", JSON.stringify(parseArr));
      } else {
        let arr = [];
        arr.push({ taskName, taskStatus });
        localStorage.setItem("usersArr", JSON.stringify(arr));
      }
      usersArr = localStorage.getItem("usersArr");
      reset();
    } else {
      let parseArr = JSON.parse(usersArr);
      parseArr[idToEdit] = { taskName, taskStatus };
      localStorage.setItem("usersArr", JSON.stringify(parseArr));
      usersArr = JSON.stringify(parseArr);
      reset();
    }
    render(usersArr);
  }
}

function render(arr) {
  tableBody.innerHTML = "";
  let parseArr = JSON.parse(arr);
  parseArr.map((val, index) => {
    let tableRow = document.createElement("tr");
    tableRow.innerHTML = ` <td>${val.taskName}</td>
            <td>${val.taskStatus}</td>
            <td><i class="fa-solid fa-pen-to-square" onclick="handleEdit(${index})"></i></td>
            <td><i class="fa-solid fa-delete-left" onclick="handleDelete(${index})"></i></td>`;
    tableBody.append(tableRow);
  });
}
function handleDelete(id) {
  let parseArr = JSON.parse(usersArr);
  parseArr.splice(id, 1);
  localStorage.setItem("usersArr", JSON.stringify(parseArr));
  usersArr = JSON.stringify(parseArr);
  render(usersArr);
}
function handleEdit(id) {
  idToEdit = id;
  let parseArr = JSON.parse(usersArr);
  let taskName = document.querySelector("#taskName");
  let taskStatus = document.querySelector("#taskStatus");
  let userToEdit = parseArr.find((val, index) => {
    if (id === index) return val;
  });
  taskName.value = userToEdit.taskName;
  taskStatus.value = userToEdit.taskStatus;
  submitBtn.value = "Update";
}
function reset() {
  let taskName = document.querySelector("#taskName");
  let taskStatus = document.querySelector("#taskStatus");
  taskName.value = "";
  taskStatus.value = "";
  return;
}

function handleValidation(name, status) {
  let nameAlert = document.querySelector(".nameAlert");
  let statusCheck = ["ONGOING", "COMPLETED", "PENDING"];
  let statusAlert = document.querySelector(".statusAlert");
  if (name.length < 3) {
    nameAlert.classList.remove("hide");
    return false;
  }
  if (!statusCheck.includes(status.toUpperCase()))
    statusAlert.classList.remove("hide");
  else {
    nameAlert.classList.add("hide");
    statusAlert.classList.add("hide");
    return true;
  }
}
