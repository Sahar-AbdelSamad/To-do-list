import './style.css';
import { editTaskFunction, listItems, data } from './addAndRemove.js';
import './addAndRemove';

const listTheItemsFunction = () => {
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
        const removeTask = document.querySelectorAll('.fa-ellipsis-v');
        removeTask.forEach((item) => item.addEventListener('click', editTaskFunction));
      }
    }
  }
};
window.onload = listTheItemsFunction();
