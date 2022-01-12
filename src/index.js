import './style.css';
const listItems = document.querySelector('.listItems');

const task = [
  {
    description : "Study chapter 1",
    completed : true,
    index : 0
  },
  {
    description : "Study chapter 2",
    completed : true,
    index : 1
  },
  {
    description : "Study chapter 3",
    completed : false,
    index : 2
  }
]

function listTheItems() {
  for (let i=0 ; i< task.length; i += 1) {
    const li = document.createElement('li');
    li.textContent = (`${task[i].description}`);
    listItems.appendChild(li);
  }
} 
window.onload = listTheItems();
