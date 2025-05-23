import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TodoApp.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Use local storage to persist todos
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch {
        console.error('Failed to parse stored todos');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };
    
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInputValue('');
  };

  const handleToggleComplete = (id) => {
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const filteredTodos = filter === 'all' 
    ? todos 
    : filter === 'active' 
      ? todos.filter(todo => !todo.completed) 
      : todos.filter(todo => todo.completed);

  return (
    <div className="todo-app">
      <h1>To-Do List</h1>
      
      <form className="todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className="clear-completed-btn"
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
      
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-message">No tasks found</li>
        ) : (
          filteredTodos.map(todo => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
              </div>
              <button 
                onClick={() => handleDeleteTodo(todo.id)}
                className="delete-btn"
                aria-label="Delete task"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>
      
      <div className="todo-stats">
        {todos.length > 0 && (
          <div className="items-left">
            {todos.filter(todo => !todo.completed).length} items left
          </div>
        )}
      </div>
      
      <div className="navigation-link">
        <Link to="/" className="back-link">Back to Calculator</Link>
      </div>
    </div>
  );
};

export default TodoApp; 