export class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('list') || '[]');
    this.complete = false;
    this.inputTask = document.querySelector('.inputTask');
    this.listItems = document.querySelector('.listItems');
    this.completedTasks = document.querySelector('.clear');
    this.indexStart = 0;
    this.indexDrop = 0;
  }

  listTheItems = () => {
    this.tasks.forEach((todo, index) => {
      const div = document.createElement('div');
      const li = document.createElement('li');
      li.textContent = `${todo.description}`;
      if (todo.completed === true) {
        li.style.textDecoration = 'line-through';
      }
      div.id = index;
      div.draggable = 'true';
      div.innerHTML = `<i class="fas fa-ellipsis-v dots"></i>
      <input type="checkbox" class="box" ${todo.completed ? 'checked' : ''}>`;
      div.className = 'listItem';
      div.appendChild(li);
      this.listItems.appendChild(div);
    });
  };

  addtask = () => {
    this.inputTask.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        if (this.inputTask.value) {
          const newTask = {
            description: this.inputTask.value,
            index: this.tasks.length + 1,
            completed: false,
          };
          const newTaskAdded = this.tasks.concat(newTask);
          this.localStorage(newTaskAdded);
          this.inputTask.value = '';
        }
      }
    });
  };

  editTask = () => {
    const dots = document.querySelectorAll('.dots');
    dots.forEach((item) => {
      item.addEventListener('click', () => {
        const parent = item.parentNode;
        const trash = document.querySelector('.trash');
        const editInput = document.createElement('input');
        if (trash === null) {
          this.changeInputTaskStyle(parent, editInput);
          // Save updated Task
          this.saveUpdatedTask(parent, editInput);
          // removeTask
          const trash = document.querySelector('.trash');
          trash.addEventListener('click', () => this.removeTask(parent.id));
        }
      });
    });
  }

  changeInputTaskStyle = (parent, editInput) => {
    editInput.name = 'newValue';
    editInput.className = 'newInput';
    editInput.value = parent.childNodes[3].lastChild.data;
    parent.childNodes[3].lastChild.data = '';
    parent.className = 'newValue';
    parent.innerHTML = '<input type="checkbox" class="box"><i class="fas fa-trash-alt trash"></i>';
    parent.appendChild(editInput);
    document.querySelector('.newInput').focus();
  }

  saveUpdatedTask = (parent, editInput) => {
    editInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        const newTaskUpdated = this.tasks.map((item) => ({
          description: item.description,
          index: item.index,
          completed: item.completed,
        }));
        newTaskUpdated[parent.id].description = editInput.value;
        this.localStorage(newTaskUpdated);
      }
    });
  }

  removeTask = (index) => {
    const beforRemovedItem = this.tasks.slice(0, index);
    const afterRemovedItem = this.tasks.slice(+index + 1, this.tasks.length + 1);
    const arrayWithRemovedTask = beforRemovedItem.concat(afterRemovedItem);
    arrayWithRemovedTask.forEach((item, index) => {
      item.index = index + 1;
    });
    this.localStorage(arrayWithRemovedTask);
  };

  localStorage = (array) => {
    localStorage.setItem('list', JSON.stringify(array));
    window.location.reload();
  };

  updateStatuses = () => {
    const box = document.querySelectorAll('.box');
    box.forEach((item, index) => item.addEventListener('change', () => {
      if (item.checked) {
        item.parentNode.childNodes[3].style.textDecoration = 'line-through';
        this.tasks[index].completed = true;
        this.localStorage(this.tasks);
      } else {
        item.parentNode.childNodes[3].style.textDecoration = 'none';
        this.tasks[index].completed = false;
        this.localStorage(this.tasks);
      }
    }));
  };

  clearCompleted = () => {
    const complete = this.tasks.filter((task) => task.completed !== true);
    this.completedTasks.addEventListener('click', () => {
      this.localStorage(complete);
    });
  };

  getTaskArray = () => {
    const data = this.tasks;
    return data;
  }
}

export const instance = new ToDoList();
instance.addtask();
instance.clearCompleted();
instance.listTheItems();
export const edit = instance.editTask();
export const statusUpdate = instance.updateStatuses();
export const data = instance.getTaskArray();
