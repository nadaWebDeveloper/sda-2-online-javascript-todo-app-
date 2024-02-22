let tasks = [
    {
      title: "Read Book",
      date: "2024-02-19",
      isDone: false,
    },
    {
      title: "Do Homework",
      date: "2023-09-23",
      isDone: true,
    },
    
  ];

  //  <--- TASK 1.READ - C(R)UD OPERATION  --->
let tasksList = document.getElementById("tasks-list");
function displayTodo(){
  tasksList.innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let content = `    
    <div class="task ${task.isDone ? 'done': ''}">
    <div class="task__info">
     <p id="task-list">${task.title}</p>
     <input type="date" value ="${task.date}" name="task-list" id="task-list" class="task__date">
    </div>

    <div class="task__action">
     <button class="circle" onClick="deleteTask(${index})">
       <i class="fa-solid fa-calendar-xmark"></i>
     </button>
     <button class="circle" onClick="editTask(${index})">
       <i class="fa-solid fa-file-pen"></i>
     </button>
     <button class="circle" onClick="toggleCompletedTask(${index})">
     ${task.isDone?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-clipboard-check"></i>'}
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
createList.addEventListener("click", () => {
  document.getElementById("display").removeAttribute("class");
});

// Add task
let addTask = document.querySelector(".action-todo");
const dataInput = document.getElementsByClassName("todo-input");
const dataDate = document.getElementsByClassName("date-input");

addTask.addEventListener("click", (e) => {
  e.preventDefault();
  let newTask = dataInput[0].value.trim();
  let newDate = dataDate[0].value;
  // if (newDate === '') {
  //   let now = new Date();
  //   var date = now.getFullYear()  +"-"+ (now.getMonth()+1)+"-"+ now.getDate();
  // }

  let taskObj = {
    title: newTask,
    date: newDate,
    isDone: false,
  };
  tasks.push(taskObj);
  displayTodo();
});


// <---  TASK 3.DELETE - CRU(D) OPERATION  --->
function deleteTask(index) {
    let task = tasks[index].title;
    let isConfirmed = confirm(`Are you Sure to delete : \n\t[${task}] ?`);
    if (isConfirmed) {
      tasks.splice(index, 1);
      displayTodo();
    }
  }