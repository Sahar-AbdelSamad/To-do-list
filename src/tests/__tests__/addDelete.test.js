/** * @jest-environment jsdom */
import { addtask, removeTask, editTask, updateStatuses, clearCompleted } from '../addDelete.js'

describe('Add and delete tests', () => {
  const task = {
    description: "Task1",
    index: 1,
    completed: false,
  };

  test('Add one item to the list', () => {
    addtask(task);
    const list = document.querySelectorAll('.listItem');
    expect(list).toHaveLength(1);
  })

  test('Delete a task', () => {
    const remove = removeTask(0);
    const list = document.querySelectorAll('.listItem');
    expect(list).toHaveLength(0);
    }) 
});
    
