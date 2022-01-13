/* eslint-disable no-unused-vars */
const inputTask = document.querySelector('input');
export const listItems = document.querySelector('.listItems');
export const data = JSON.parse(localStorage.getItem('list'));
let tasks = [];

const id = 0;

class Task {
  constructor(description, complete, index) {
    this.description = description;
    this.complete = false;
    this.index = id + 1;
  }
}

const removeTaskFunction = (e) => {
  if (data && data[0]) {
    tasks = data;
  }
  const div = Array.from(document.querySelectorAll('[data-id]'));
  for (let i = 0; i < tasks.length; i += 1) {
    if (div[i].dataset.id === e.target.id.toString()) {
      listItems.removeChild(div[i]);
      div.splice(i, 1);
      tasks.splice(e.target.id, 1);
    }
  }
  if (tasks.length ===0) {
      tasks[0] = undefined;
      localStorage.setItem('list', JSON.stringify(tasks));
      return;
    } else {
      for (let i = 0; i < tasks.length; i += 1) {
        tasks[i].index = i;
        div[i].dataset.id = i;
        const removeTask = document.querySelectorAll('.fa-ellipsis-v');
        removeTask[i].id = i;
        localStorage.setItem('list', JSON.stringify(tasks));
      }
    }
};

export const editTaskFunction = (ev) => {
  if (data[0]) {
    tasks = data;
  }
  const div = Array.from(document.querySelectorAll('[data-id]'));
  const newValue = document.querySelector('.newValue');
  if (div[ev.target.id].childNodes.length > 3 || (!newValue === false)) {
    return;
  }
  const editInput = document.createElement('input');
  editInput.name = ('newValue');
  editInput.className = ('newInput');
  editInput.value = div[ev.target.id].childNodes[1].lastChild.data;
  div[ev.target.id].childNodes[1].lastChild.data = '';
  div[ev.target.id].className = ('newValue');
  div[ev.target.id].innerHTML = (`<i class="fas fa-trash-alt" id="${ev.target.id}"></i><input type="checkbox" class="box">`);
  div[ev.target.id].appendChild(editInput);
  document.querySelector('.newInput').focus();
  editInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      const li = document.createElement('li');
      li.textContent = editInput.value;
      div[ev.target.id].innerHTML = (`<i class="fas fa-ellipsis-v" id="${ev.target.id}"></i>`);
      div[ev.target.id].className = ('listItem');
      div[ev.target.id].appendChild(li);
      const inputCheckbox = document.createElement('input');
      inputCheckbox.type = ('checkbox');
      inputCheckbox.className = ('box');
      div[ev.target.id].appendChild(inputCheckbox);
      tasks[ev.target.id].description = editInput.value;
      localStorage.setItem('list', JSON.stringify(tasks));
      // Update Tasks
      document.querySelectorAll('.fa-ellipsis-v').forEach((item) => item.addEventListener('click', editTaskFunction));
    }
  });
  // Remove tasks
  document.querySelector('.fa-trash-alt').addEventListener('click', removeTaskFunction);
};

const addtaskFunction = () => {
  if (data && data[0]) {
    tasks = data;
  }
  const newTask = new Task(inputTask.value);
  newTask.index = tasks.length;
  const li = document.createElement('li');
  const div = document.createElement('div');
  const input = document.createElement('input');
  input.type = ('checkbox');
  input.className = ('box');
  li.textContent = (`${newTask.description}`);
  div.innerHTML = (`<i class="fas fa-ellipsis-v" id= "${tasks.length}"></i>`);
  div.className = ('listItem');
  div.dataset.id = tasks.length;
  div.appendChild(li);
  div.append(input);
  listItems.appendChild(div);
  inputTask.value = '';
  tasks.push(newTask);
  localStorage.setItem('list', JSON.stringify(tasks));
  // Update Tasks
  document.querySelectorAll('.fa-ellipsis-v').forEach((item) => item.addEventListener('click', editTaskFunction));
};

inputTask.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    addtaskFunction();
  }
});
