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
  
  });
  