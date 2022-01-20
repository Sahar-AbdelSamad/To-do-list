import StorageMock from './__mocks__/storageMock';

const localStorage = new StorageMock();

export const addtask = (task) => {
  const arr = JSON.parse(localStorage.getItem('list') || '[]');
  document.body.innerHTML = '<div class="listItem"></div>';
  const newArray = arr.concat(task);
  localStorage.setItem('list', JSON.stringify(newArray));
};

export const removeTask = (index) => {
  const arr = JSON.parse(localStorage.getItem('list') || '[]');
  document.body.innerHTML = '';
  const beforRemovedItem = arr.slice(0, index);
  const afterRemovedItem = arr.slice(+index + 1, arr.length + 1);
  const arrayWithRemovedTask = beforRemovedItem.concat(afterRemovedItem);
  arrayWithRemovedTask.forEach((item, index) => {
    item.index = index + 1;
  });
  console.log(arrayWithRemovedTask)
  localStorage.setItem('list', JSON.stringify(arrayWithRemovedTask));
};

export const editTask = (task, textUpdate) => {
  task.description = textUpdate;
  console.log(task)
  localStorage.setItem("list",JSON.stringify(task));
};

export const updateStatuses = (task, status) => {
  task.completed = status;
  localStorage.setItem("list", task);
};

export const clearCompleted = () => {
  const arr = JSON.parse(localStorage.getItem('list') || '[]');
  console.log(arr)
  const notCompleted = arr.filter((task) => task.completed !== true);
  console.log(notCompleted)
  localStorage.setItem("list", notCompleted);
};