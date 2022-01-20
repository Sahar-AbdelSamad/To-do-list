/** * @jest-environment jsdom */
import {
  updateStatuses, editTask, clearCompleted,
} from '../addDelete';

describe('Test clearCompleted tasks, update Status and edit Task', () => {
  const task = {
    description: 'Task1',
    index: 1,
    completed: false,
  };

  test('clear completed tasks', () => {
    clearCompleted();
    const list = document.querySelectorAll('.listItem');
    expect(list).toMatchObject({});
  });

  test('Edit a Task', () => {
    const textUpdate = 'This is the update';
    expect(task.description).not.toEqual('This is the update');
    editTask(task, textUpdate);
    expect(task.description).toEqual('This is the update');
  });

  test('Update Status', () => {
    const statusComplete = true;
    updateStatuses(task, statusComplete);
    expect(task.completed).toEqual(statusComplete);
  });
});
