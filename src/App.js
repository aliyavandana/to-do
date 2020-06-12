import React, {useState} from 'react';
import TodoList from './TodoList'
import './App.css';

function App(props) {
  const [items, setItems] = useState([]);
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    const newItem = {
      text: text,
      id: Date.now()
    };
    setText('');
    setItems(items.concat(newItem))
  }

  return (
    <div>
      <h3>TODO</h3>
      <TodoList items={items} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">
          What needs to be done?
        </label>
        <input
          id="new-todo"
          onChange={handleChange}
          value={text}
        />
        <button>
          Add #{items.length + 1}
        </button>
      </form>
    </div>
  );
}

export default App;
