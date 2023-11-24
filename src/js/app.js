const app = {
  todos: [],

  add: () => {
    const todoAdd = document.querySelector("[data-id=add-btn]");
    todoAdd.addEventListener("click", () => {
      let todoText = document.querySelector("input").value;
      if (!todoText) {
        alert("Add a task!");
        return;
      }

      const newTodo = {
        text: todoText,
        completed: false,
      };

      app.todos.push(newTodo);
      app.renderTodos();
    });
  },

  renderTodos: () => {
    const section = document.querySelectorAll("section")[1];
    section.innerHTML = "";

    app.todos.forEach((todo, index) => {
      const todo_container = document.createElement("div");
      const todo_task = document.createElement("div");
      const close = document.createElement("button");

      close.className = "close";
      close.innerText = "x";

      todo_container.className = "todos";
      todo_task.className = "todo-task";
      todo_task.innerText = todo.text;

      // Toggle line-through based on the todo's completed state
      if (todo.completed) {
        todo_task.style.textDecoration = "line-through";
      }

      todo_task.addEventListener("click", () => {
        // Toggle the completed state
        todo.completed = !todo.completed;
        app.renderTodos();
      });

      todo_container.appendChild(todo_task);
      todo_container.appendChild(close);
      section.appendChild(todo_container);

      // Add event listener for the new close button
      close.addEventListener("click", () => {
        console.log("Task deleted");
        // Remove the todo from the array
        app.todos = app.todos.filter((t) => t !== todo);
        app.renderTodos();
      });
    });

    document.querySelector("input").value = "";
  },

  init: () => {
    app.add();
    app.renderTodos();
  },
};

window.onload = app.init;
