const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const task = { text: taskText, completed: false };
  saveTask(task);
  renderTask(task);
  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task.text;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "Done";
  completeBtn.classList.add("complete-btn");
  completeBtn.onclick = () => toggleComplete(task.text, li);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => deleteTask(task.text, li);

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);

  taskList.appendChild(li);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(renderTask);
}

function deleteTask(text, li) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.remove();
}

function toggleComplete(text, li) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(t => {
    if (t.text === text) t.completed = !t.completed;
    return t;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  li.classList.toggle("completed");
}
