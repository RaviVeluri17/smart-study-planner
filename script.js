document.addEventListener("DOMContentLoaded", loadTasks);

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDate = document.getElementById("task-date");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask(taskInput.value, taskDate.value);
  taskInput.value = "";
  taskDate.value = "";
});

function addTask(text, date, save = true) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.innerHTML = `
    <span>${text} <small>[${date}]</small></span>
    <div class="task-buttons">
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Mark Complete
  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  // Delete
  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    saveTasks();
  });

  taskList.appendChild(li);

  if (save) saveTasks();
}

// Save to Local Storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".task-item").forEach(task => {
    tasks.push({
      text: task.querySelector("span").innerText,
      done: task.classList.contains("done")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load from Local Storage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => {
    addTask(task.text.replace(/\s\[.\]/, ""), task.text.match(/\[(.?)\]/)[1], false);
    if (task.done) {
      taskList.lastChild.classList.add("done");
    }
  });
}