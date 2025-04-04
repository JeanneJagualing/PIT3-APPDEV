import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const apiUrl = 'https://todo-backend-ul0j.onrender.com/api/todos/';  

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setTodos(Array.isArray(data) ? data : []))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const addTodo = () => {
    if (!title) return;
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false })
    })
      .then(res => res.json())
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(err => console.error('Add error:', err));
    setTitle('');
  };

  const startEditing = (id, currentTitle) => {
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const saveEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    fetch(`${apiUrl}${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, completed: todo.completed })
    })
      .then(res => res.json())
      .then(updatedTodo => {
        setTodos(todos.map(t => t.id === id ? updatedTodo : t));
        setEditingId(null);
      })
      .catch(err => console.error('Edit error:', err));
  };

  const toggleTodo = (id, completed) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    fetch(`${apiUrl}${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todo.title, completed: !completed })
    })
      .then(() => setTodos(todos.map(t => t.id === id ? { ...t, completed: !completed } : t)))
      .catch(err => console.error('Toggle error:', err));
  };

  const deleteTodo = (id) => {
    fetch(`${apiUrl}${id}/`, { method: 'DELETE' })
      .then(() => setTodos(todos.filter(t => t.id !== id)))
      .catch(err => console.error('Delete error:', err));
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'Done') return todo.completed;
      if (filter === 'Pending') return !todo.completed;
      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header>
        <h1>Assignments</h1>
      </header>
      <div className="container">
        <div className="input-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a todo"
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <input
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search assignments..."
        />
        <div className="tabs">
          <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>
            All
          </button>
          <button className={filter === 'Pending' ? 'active' : ''} onClick={() => setFilter('Pending')}>
            To Do
          </button>
          <button className={filter === 'Done' ? 'active' : ''} onClick={() => setFilter('Done')}>
            Done
          </button>
        </div>
        <ul className="assignment-list">
          {filteredTodos.length === 0 ? (
            <p className="empty-message">
              {search ? 'No matching assignments.' : 'No assignments yet—add one!'}
            </p>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} className="assignment-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                />
                {editingId === todo.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                    />
                    <button onClick={() => saveEdit(todo.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
                    <button onClick={() => startEditing(todo.id, todo.title)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                      ✕
                    </button>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </div>
  );
}

export default App;