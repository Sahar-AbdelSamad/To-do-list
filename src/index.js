import { instance } from './addAndRemove.js';
import { dragTask } from './reorder.js';
import './style.css';

window.onload = () => {
  instance.editTask();
  instance.updateStatuses();
  dragTask.drag();
};
