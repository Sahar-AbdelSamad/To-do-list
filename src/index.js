import './style.css';

const listItems = document.querySelector('.listItems');

const task = [
  {
    description: 'Study chapter 1',
    completed: true,
    index: 0,
  },
  {
    description: 'Study chapter 2',
    completed: true,
    index: 1,
  },
  {
    description: 'Study chapter 3',
    completed: false,
    index: 2,
  },
];

const listTheItems = () => {
  for (let i = 0; i < task.length; i += 1) {
    const li = document.createElement('li');
    const div = document.createElement('div');
    const input = document.createElement('input');
    input.type = ('checkbox');
    input.className = ('box');
    li.textContent = (`${task[i].description}`);
    div.innerHTML = ('<i class="fas fa-ellipsis-v"></i>');
    div.className = ('listItem');
    div.appendChild(li);
    div.append(input);
    listItems.appendChild(div);
  }
};
window.onload = listTheItems();
