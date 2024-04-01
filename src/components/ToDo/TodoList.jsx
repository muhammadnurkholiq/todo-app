import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

// api
import { GetAllChecklist, DeleteChecklist } from '../../axios/todoApi';

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await GetAllChecklist();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteChecklist(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      {todos?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
}
