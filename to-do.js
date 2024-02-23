let tasks = [];
getTaskFromStorage();

//  <--- TASK 1.READ - C(R)UD OPERATION  --->
let tasksList = document.getElementById("tasks-list");
function displayTodo() {
  tasksList.innerHTML = "";
  let index = 0;
  for (const task of tasks) {
    let content = `    
    <div class="task ${task.isDone ? "done" : ""}">
    <div class="task__info">
     <p id="task-list">${task.title}</p>
     <input type="date" value ="${task.date}" 
     name="task-list" id="task-list" class="task__date">
    </div>

    <div class="task__action">
     <button class="circle" onClick="deleteTask(${index})">
       <i class="fa-solid fa-calendar-xmark"></i>
     </button>
     <button class="circle" onClick="editTask(${index})">
       <i class="fa-solid fa-file-pen"></i>
     </button>
     <button class="circle" onClick="toggleCompletedTask(${index})">
     ${
       task.isDone
         ? '<i class="fa-solid fa-xmark"></i>'
         : '<i class="fa-solid fa-clipboard-check"></i>'
     }
     </button>
    </div>
    </div>`;

    tasksList.innerHTML += content;

    //task counter
    index++;
  }
  counterTask();
}
displayTodo();

//  <--- TASK 2.CREATE - (C)RUD OPERATION  --->
//to display form added
let createList = document.getElementById("add-btn");
let formAdd = document.getElementById("display");
createList.addEventListener("click", () => {
  formAdd.removeAttribute("class");
});

//to close form added
let closeForm = document.getElementsByClassName("x-close")[0];
closeForm.addEventListener("click", () => {
  formAdd.classList.add("hidden");
});

// Add task
let addTask = document.querySelector(".action-todo");
const dataInput = document.getElementsByClassName("todo-input");
const dataDate = document.getElementsByClassName("date-input");

addTask.addEventListener("click", (e) => {
  e.preventDefault();
  let newTask = dataInput[0].value.trim();
  let newDate = dataDate[0].value;

  let taskObj = {
    title: newTask,
    date: newDate,
    isDone: false,
  };
  tasks.push(taskObj);
  formAdd.classList.add("hidden");
  storageTask();
  displayTodo();
});

// <---  TASK 3.DELETE - CRU(D) OPERATION  --->
function deleteTask(index) {
  let task = tasks[index].title;
  let isConfirmed = confirm(`Are you Sure to delete : \n\t[${task}] ?`);
  if (isConfirmed) {
    tasks.splice(index, 1);
    storageTask();
    displayTodo();
  }
}

// <---  TASK 4.UPDATE - CR(U)D OPERATION  --->
function editTask(index) {
  addTask.innerHTML = `&#9998;`;
  document.getElementById("display").removeAttribute("class");
  let editTask = tasks[index];

  dataInput[0].value = editTask.title;
  dataDate[0].value = editTask.date;

  addTask.addEventListener("click", (e) => {
    e.preventDefault();

    const updateInput = document.getElementsByClassName("todo-input");
    const updateDate = document.getElementsByClassName("date-input");

    let newTask = updateInput[0].value.trim();
    let newDate = updateDate[0].value;

    editTask.title = newTask;
    editTask.date = newDate;
    formAdd.classList.add("hidden");
    storageTask();
    displayTodo();
  });
}

// <---  TASK 5.COMPLETE TASK  --->
function toggleCompletedTask(index) {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storageTask();
  displayTodo();
}

// <---  TASK 5.COUNTER TASK  --->
function counterTask() {
  let counterEl = document.getElementsByTagName("h2")[0];
  const activeTodos = tasks.filter((todo) => !todo.isDone).length;
  const completedTodos = tasks.length - activeTodos;
  counterEl.innerHTML = `All: ${tasks.length}, Active: ${activeTodos}, Completed: ${completedTodos}`;
}

// <---  TASK 6.STORAGE FUNCTION TASK  --->

//to save all data on local storage
function storageTask() {
  let taskString = JSON.stringify(tasks);
  window.localStorage.setItem("task", taskString);
}

//to get all data from local storage to UI
function getTaskFromStorage() {
  const retrievedTask = JSON.parse(window.localStorage.getItem("task"));
  tasks = retrievedTask ?? [];
}

// <---  TASK 7.SEARCH FUNCTION TASK  --->
const searchInput = document.getElementById("searchInput");
const todoList = document.querySelectorAll(".task");

searchInput.addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  todoList.forEach((todo) => {
    if (todo.textContent.toLowerCase().includes(term)) {
      todo.classList.remove("hidden");
    } else {
      todo.classList.add("hidden");
    }
  });
});
