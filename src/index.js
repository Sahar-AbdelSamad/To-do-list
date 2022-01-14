import './style.css';
import listTheItemsFunction from './addAndRemove.js';
import { updateStatusesFunction } from './updateStatus.js';

window.onload = () => {
  listTheItemsFunction();
  const box = document.querySelectorAll('.box');
  box.forEach((item) => item.addEventListener('change', updateStatusesFunction));
};
