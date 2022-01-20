import storageMock from './__mocks__/storageMock'

const localStorage = new storageMock;

const task = {};
export const  addtask = (task) => {
  const arr = JSON.parse(localStorage.getItem('list') || '[]');
  document.body.innerHTML ='<div class="listItem"></div>'; 
  const newArray = arr.concat(task);
  localStorage.setItem('list',JSON.stringify(newArray));
};
