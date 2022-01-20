/** * @jest-environment jsdom */
import {
  addtask, removeTask,updateStatuses, editTask, clearCompleted
} from '../addDelete';

describe('Add and delete tests', () => {
  const task = {
    description: 'Task1',
    index: 1,
    completed: false,
  };
  const task2 = {
    description: 'Task2',
    index: 2,
    completed: true,
  };

  test('Add one item to the list', () => {
    addtask(task);
    addtask(task2);
    const list = document.querySelectorAll('.listItem');
    expect(list).toHaveLength(1);
  });

  test('Delete a task', () => {
    removeTask(0);
    const list = document.querySelectorAll('.listItem');
    expect(list).toHaveLength(0);
  });
  
  test ('Update a Task', () => {
    const textUpdate = "This is the update";
    editTask(task, textUpdate);
    expect(task.description).toEqual("This is the update");
  })

  test('Update Status', () => {
    const statusComplete = true;
    updateStatuses(task, statusComplete);
    expect(task.completed).toEqual(statusComplete);
  })

  test('clear completed tasks', () => {
    clearCompleted();
    const list = document.querySelectorAll('.listItem');
    expect(list).toMatchObject({});
  });
});
