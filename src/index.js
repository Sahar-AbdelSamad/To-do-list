import {instance} from './addAndRemove.js';
import './style.css';

window.onload = () => {
  instance.editTask();
  instance.updateStatuses();
};
