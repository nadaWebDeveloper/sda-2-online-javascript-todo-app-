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