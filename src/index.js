import { instance } from './addAndRemove';
import { dragTask } from './reorder';
import './style.css';

window.onload = () => {
  instance.editTask();
  instance.updateStatuses();
  dragTask.drag();
};
