class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem("list") || "[]");
    this.complete = false;
    this.inputTask = document.querySelector(".inputTask");
    this.listItems = document.querySelector(".listItems");
    this.completedTasks = document.querySelector(".clear");
  }

  listTheItems = () => {
    //tasks.sort((a, b) => a.index - b.index);
    this.tasks.forEach((todo, index) => {
      const div = document.createElement("div");
      const li = document.createElement("li");
      li.textContent = `${todo.description}`;
      if (todo.completed === true) {
        li.style.textDecoration = "line-through";
      }
      div.id = index;
      div.innerHTML = `<i class="fas fa-ellipsis-v dots"></i>
      <input type="checkbox" class="box" ${todo.completed ? "checked" : ""}>`;
      div.className = "listItem";
      div.appendChild(li);
      this.listItems.appendChild(div);
    });
  };

  addtask = () => {
    this.inputTask.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) {
        const newTask = {
          description: this.inputTask.value,
          index: this.tasks.length + 1,
          completed: false,
        };
        this.tasks.push(newTask);
        this.localStorage(this.tasks);
        this.inputTask.value = "";
      }
    });
  };

  editTask = () => {
    document.querySelectorAll(".dots").forEach((item) => {
      item.addEventListener("click", () => {
        const parent = item.parentNode;
        const editInput = document.createElement("input");
        editInput.name = "newValue";
        editInput.className = "newInput";
        editInput.value = parent.childNodes[3].lastChild.data;
        parent.childNodes[3].lastChild.data = "";
        parent.className = "newValue";
        parent.innerHTML = `<input type="checkbox" class="box"><i class="fas fa-trash-alt trash"></i>`;
        parent.appendChild(editInput);
        document.querySelector(".newInput").focus();
        //removeTask
        const trash = document.querySelector(".trash");
        trash.addEventListener("click", (e) => this.removeTask(parent.id));
        editInput.addEventListener("keyup", (event) => {
          if (event.keyCode === 13) {
            const li = document.createElement("li");
            li.textContent = editInput.value;
            parent.innerHTML = `<i class="fas fa-ellipsis-v dots"></i><input type="checkbox" class="box">`;
            parent.className = "listItem";
            parent.appendChild(li);
            this.tasks[parent.id].description = editInput.value;
            this.localStorage(this.tasks);
          }
        });
      });
    });
  };

  removeTask = (index) => {
    this.tasks.splice(index, 1);
    this.localStorage(this.tasks);
    this.tasks.forEach((item, index) => {
    item.index = index + 1;
    this.localStorage(this.tasks);
  });
}

  localStorage = (array) => {
    localStorage.setItem("list", JSON.stringify(array));
    window.location.reload();
  };

  updateStatuses = () => {
    const box = document.querySelectorAll(".box");
    box.forEach((item, index) =>
      item.addEventListener("change", () => {
        if (item.checked) {
          item.parentNode.childNodes[3].style.textDecoration = "line-through";
          this.tasks[index].completed = true;
          this.localStorage(this.tasks);
        } else {
          item.parentNode.childNodes[3].style.textDecoration = "none";
          this.tasks[index].completed = false;
          this.localStorage(this.tasks);
        }
      })
    );
  };

  clearCompleted = () => {
    const complete = this.tasks.filter((task) => task.completed !== true);
    this.completedTasks.addEventListener("click", () => {
      this.localStorage(complete);
    });
  };
}

export const instance = new ToDoList();
instance.addtask();
instance.clearCompleted();
instance.listTheItems();
