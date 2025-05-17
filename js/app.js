document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const filters = document.querySelectorAll('input[name="filter"]');

  let tasks = [];

  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false
      };
      tasks.push(task);
      taskInput.value = "";
      renderTasks();
    }
  });

  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle")) {
      const id = Number(e.target.dataset.id);
      tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      renderTasks();
    } else if (e.target.classList.contains("delete")) {
      const id = Number(e.target.dataset.id);
      tasks = tasks.filter(task => task.id !== id);
      renderTasks();
    }
  });

  filters.forEach(filter => {
    filter.addEventListener("change", () => {
      renderTasks();
    });
  });

  function renderTasks() {
    const selectedFilter = document.querySelector('input[name="filter"]:checked').value;
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
      if (selectedFilter === "all") return true;
      if (selectedFilter === "completed") return task.completed;
      if (selectedFilter === "not-completed") return !task.completed;
    });

    filteredTasks.forEach(task => {
      const li = document.createElement("li");
      li.classList.toggle("completed", task.completed);
      li.innerHTML = `
        ${task.text}
        <div>
          <button class="toggle" data-id="${task.id}">${task.completed ? "Undo" : "Complete"}</button>
          <button class="delete" data-id="${task.id}">Delete</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  }
});
