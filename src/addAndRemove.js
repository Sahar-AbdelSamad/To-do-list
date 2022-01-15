export class ToDoList {
  constructor() {
    this.tasks = JSON.parse(localStorage.getItem('list' || '[]'));
    this.complete = false;
    this.inputTask = document.querySelector('input');
    this.listItems = document.querySelector('.listItems');
  }

  removeTaskFunction = (e) => {
    if (data && data[0]) {
      tasks = data;
    }
    const div = Array.from(document.querySelectorAll('[data-id]'));
    for (let i = 0; i < tasks.length; i += 1) {
      if (div[i].dataset.id === e.target.id.toString()) {
        listItems.removeChild(div[i]);
        div.splice(i, 1);
        tasks.splice(e.target.id - 1, 1);
        localStorage.setItem('list', JSON.stringify(tasks));
      }
    }
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i + 1;
      div[i].dataset.id = i + 1;
      const removeTask = document.querySelectorAll('.fa-ellipsis-v');
      const input = document.querySelectorAll('.box');
      removeTask[i].id = i + 1;
      input[i].dataset.input = i + 1;
      localStorage.setItem('list', JSON.stringify(tasks));
    }
  }

  editTaskFunction = (ev) => {
    const div = Array.from(document.querySelectorAll('[data-id]'));
    const newValue = document.querySelector('.newValue');
    if (div[ev.target.id - 1].childNodes.length > 3 || (!newValue === false)) {
      return;
    }
    const editInput = document.createElement('input');
    editInput.name = ('newValue');
    editInput.className = ('newInput');
    editInput.value = div[ev.target.id - 1].childNodes[1].lastChild.data;
    div[ev.target.id - 1].childNodes[1].lastChild.data = '';
    div[ev.target.id - 1].className = ('newValue');
    div[ev.target.id - 1].innerHTML = (`<i class="fas fa-trash-alt" id="${ev.target.id}"></i><input type="checkbox" class="box">`);
    div[ev.target.id - 1].appendChild(editInput);
    document.querySelector('.newInput').focus();
    editInput.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        const li = document.createElement('li');
        li.textContent = editInput.value;
        div[ev.target.id - 1].innerHTML = (`<i class="fas fa-ellipsis-v" id="${ev.target.id}"></i>`);
        div[ev.target.id - 1].className = ('listItem');
        div[ev.target.id - 1].appendChild(li);
        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = ('checkbox');
        inputCheckbox.className = ('box');
        inputCheckbox.dataset.input = ev.target.id;
        div[ev.target.id - 1].appendChild(inputCheckbox);
        tasks[ev.target.id - 1].description = editInput.value;
        localStorage.setItem('list', JSON.stringify(tasks));
        // Update Tasks
        document.querySelectorAll('.fa-ellipsis-v').forEach((item) => item.addEventListener('click', editTaskFunction));
        const box = document.querySelectorAll('.box');
        box.forEach((item) => item.addEventListener('change', updateStatusesFunction));
      }
    });
    // Remove tasks
    document.querySelector('.fa-trash-alt').addEventListener('click', removeTaskFunction);
  }

  listTheItemsFunction() {
    //tasks.sort((a, b) => a.index - b.index);
    this.tasks.forEach((todo, index) => {
      const li = document.createElement('li');
      const div = document.createElement('div');
      div.id = index;
      li.textContent = (`${todo.description}`);
      div.innerHTML = (`<i class="fas fa-ellipsis-v"></i>
      <input type="checkbox" class="box" ${todo.completed ? 'cheched' : ''}>`);
      div.className = ('listItem');
      div.appendChild(li);
      this.listItems.appendChild(div);
    })
  }

  addtaskFunction = () => {
    this.inputTask.addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        const newTask = {
          description : this.inputTask.value,
          index: this.tasks.length + 1,
          completed: false
        };
        this.saveTask(newTask);
        this.inputTask = "";
      }
    });
  }

  saveTask(object) {
    this.tasks.push(object);
    localStorage.setItem('list', JSON.stringify(this.tasks));
    window.location.listTheItemsFunction();
  }

  updateStatusesFunction(ev) {
    if (data) {
      tasks = data;
    }
    const div = Array.from(document.querySelectorAll('.listItem'));
    if (ev.target.checked) {
      div[ev.target.dataset.input - 1].children[1].style.textDecoration = 'line-through';
      tasks[ev.target.dataset.input - 1].complete = true;
      localStorage.setItem('list', JSON.stringify(tasks));
    } else {
      div[ev.target.dataset.input - 1].children[1].style.textDecoration = 'none';
      tasks[ev.target.dataset.input - 1].complete = false;
      localStorage.setItem('list', JSON.stringify(tasks));
    }
  };

  clearCompletedFunction() {
    if (data[0]) {
      tasks = data;
    }
    tasks = tasks.filter((el) => el.complete === false);
    const listItems = document.querySelector('.listItems');
    const div = Array.from(document.querySelectorAll('[data-id]'));
    for (let i = 0; i < div.length; i += 1) {
      if (div[i].childNodes[1].style.textDecoration === 'line-through') {
        listItems.removeChild(div[i]);
      }
    }
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i + 1;
    }
    localStorage.setItem('list', JSON.stringify(tasks));
  };
}

export const instance = new ToDoList();
instance.addtaskFunction();
instance.removeTaskFunction();
instance.clearCompletedFunction();


