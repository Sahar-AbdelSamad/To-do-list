export const data = JSON.parse(localStorage.getItem('list'));
let tasks = [];

export const updateStatusesFunction = (ev) => {
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

const clearCompletedFunction = () => {
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

document.querySelector('.clear').addEventListener('click', clearCompletedFunction);