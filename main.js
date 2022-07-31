//Select DOM
const addBtn = document.querySelector(".add_btn");
const addTask = document.querySelector(".add_task");
const taskList = document.querySelector(".tasks_list");

//Event listeners
addBtn.addEventListener("click", addTodoTask);
taskList.addEventListener("click", delTask);

//Load local storage
loadStorage();
//Add task
function addTodoTask() {
  //Check that input field not empty
  const inputField = addTask.value.trim();

  if (inputField.length > 0) {
    //Creating div for task
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //Creating task
    const taskLi = document.createElement("li");
    taskLi.innerText = addTask.value;
    taskLi.classList.add("task_item");
    taskDiv.appendChild(taskLi);
    localStorage.setItem("task", addTask.value);
    //Save to local storage
    saveLocaly(addTask.value);
    addTask.value = "";
    //Creating done button
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneBtn");
    doneBtn.innerHTML = "Done";
    taskDiv.appendChild(doneBtn);
    taskList.appendChild(taskDiv);
    //Creating delete button
    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.innerHTML = "Delete";
    taskDiv.appendChild(delBtn);
    taskList.appendChild(taskDiv);
  }
}

//Delete task
function delTask(e) {
  const item = e.target;
  if (item.classList[0] === "delBtn") {
    const task = item.parentElement;
    task.remove();
    //Delete from local storage
    deleteLocaly(task);
  }

  if (item.classList[0] === "doneBtn") {
    const task = item.parentElement;
    let done = task.children[0];
    done.classList.toggle("done");
    console.log(done);
  }
}

//Function for Save to local storage
function saveLocaly(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Function for delete from local storage
function deleteLocaly(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  const taskIndex = task.children[0].innerText;
  tasks.splice(tasks.indexOf(taskIndex), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Function for Load local storage
function loadStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //Creating div for task
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //Creating task
    const taskLi = document.createElement("li");
    taskLi.innerText = task;
    taskLi.classList.add("task_item");
    taskDiv.appendChild(taskLi);
    addTask.value = "";
    //Creating done button
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("doneBtn");
    doneBtn.innerHTML = "Done";
    taskDiv.appendChild(doneBtn);
    taskList.appendChild(taskDiv);
    //Creating delete button
    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.innerHTML = "Delete";
    taskDiv.appendChild(delBtn);
    taskList.appendChild(taskDiv);
  });
}