import { data } from './addAndRemove.js';

let indexStart = 0;
let indexDrop = 0;
export class Drag {
  constructor() {
    this.todoTasks = data;
  }

  handleDragStart = (e) => {
    e.target.style.opacity = '0.4';
    indexStart = e.target.id;
  };

  handleDragOver = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  };

  handleDragEnter = (e) => {
    e.target.classList.add('over');
  };

  handleDragLeave = (e) => {
    e.target.classList.remove('over');
  };

  handleDragEnd = (e) => {
    const items = document.querySelectorAll('.listItem');
    e.target.style.opacity = '1';
    items.forEach((item) => {
      item.classList.remove('over');
    });
  };

  handleDrop = (e) => {
    e.stopPropagation(); // stops the browser from redirecting.
    indexDrop = e.target.id;
    const draggableTask = this.todoTasks.splice(indexStart, 1);
    this.todoTasks.splice(indexDrop, 0, draggableTask[0]);
    this.todoTasks.forEach((item, index) => {
      item.index = index + 1;
    });
    localStorage.setItem('list', JSON.stringify(this.todoTasks));
    window.location.reload();
  };

  drag = () => {
    const items = document.querySelectorAll('.listItem');
    items.forEach((item) => {
      item.addEventListener('dragstart', (e) => this.handleDragStart(e));
      item.addEventListener('dragover', (e) => this.handleDragOver(e));
      item.addEventListener('dragenter', (e) => this.handleDragEnter(e));
      item.addEventListener('dragleave', (e) => this.handleDragLeave(e));
      item.addEventListener('dragend', (e) => this.handleDragEnd(e));
      item.addEventListener('drop', (e) => this.handleDrop(e));
    });
  };
}

export const dragTask = new Drag();
