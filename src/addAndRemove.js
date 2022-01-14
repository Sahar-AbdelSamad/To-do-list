/* eslint-disable no-unused-vars */
import { data, updateStatusesFunction } from './updateStatus.js';

const inputTask = document.querySelector('input');
const listItems = document.querySelector('.listItems');
let tasks = [];

class Task {
  constructor(description, complete, index) {
    this.description = description;
    this.complete = false;
    this.index = tasks.length + 1;
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
};

const editTaskFunction = (ev) => {
  if (data && data[0]) {
    tasks = data;
  }
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
};

export default function listTheItemsFunction() {
  if (data) {
    if (data[0]) {
      const tasks = data;
      tasks.sort((a, b) => a.index - b.index);
      localStorage.setItem('list', JSON.stringify(tasks));
      for (let i = 0; i < tasks.length; i += 1) {
        tasks[i].index = i + 1;
        const li = document.createElement('li');
        const div = document.createElement('div');
        const input = document.createElement('input');
        input.type = ('checkbox');
        input.className = ('box');
        input.dataset.input = i + 1;
        li.textContent = (`${tasks[i].description}`);
        div.innerHTML = (`<i class="fas fa-ellipsis-v" id="${i + 1}"></i>`);
        div.className = ('listItem');
        div.dataset.id = i + 1;
        div.appendChild(li);
        div.append(input);
        listItems.appendChild(div);
        if (tasks[i].complete === true) {
          div.children[1].style.textDecoration = 'line-through';
          input.checked = true;
        }
        const removeTask = document.querySelectorAll('.fa-ellipsis-v');
        removeTask.forEach((item) => item.addEventListener('click', editTaskFunction));
      }
    }
  }
}

const addtaskFunction = () => {
  if (data) {
    tasks = data;
  }
  if (!inputTask.value) {
    return;
  }
  const newTask = new Task(inputTask.value);
  tasks.push(newTask);
  localStorage.setItem('list', JSON.stringify(tasks));
  const li = document.createElement('li');
  const div = document.createElement('div');
  const input = document.createElement('input');
  input.type = ('checkbox');
  input.className = ('box');
  input.dataset.input = tasks.length;
  li.textContent = (`${newTask.description}`);
  div.innerHTML = (`<i class="fas fa-ellipsis-v" id= "${tasks.length}"></i>`);
  div.className = ('listItem');
  div.dataset.id = tasks.length;
  div.appendChild(li);
  div.append(input);
  listItems.appendChild(div);
  inputTask.value = '';
  const box = document.querySelectorAll('.box');
  box.forEach((item) => item.addEventListener('change', updateStatusesFunction));
  // Update Tasks
  document.querySelectorAll('.fa-ellipsis-v').forEach((item) => item.addEventListener('click', editTaskFunction));
};

inputTask.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    addtaskFunction();
  }
});
