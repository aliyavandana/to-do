import React, {useState, useEffect} from 'react';
import TodoList from './TodoList'
import './App.css';

function App() {
  const [items, setItems] = useLocalStorage("items",[]);

  const [text, setText] = useState('');

  interface IItem {
    id: number;
    isStriked: boolean;
    text: string;
  }
  const handleChange = (e : React.FormEvent<HTMLInputElement>): void => {
    setText(e.currentTarget.value)
  }

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    const newItem = {
      text: text,
      id: Date.now(),
      isStriked : false
    };
    setText('');
    setItems(items.concat(newItem))
  }

  const changeItemState = (e: String) => {
    console.log(e)
    let newArray = [...items]
    let index = newArray.findIndex((el)=> el.text == e)
    newArray[index].isStriked = !newArray[index].isStriked
    setItems(newArray) 
  }

  return (
    <div>
      <h3>TODO List</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">What needs to be done?
        </label>
        <input
          id="new-todo"
          data-testid = "new-todo"
          onChange={handleChange}
          value={text}
        />
        <button>
          Add #{items.length + 1}
        </button>
      </form>
      <TodoList items={items} changeItemState={changeItemState}/>
      <div>Total Todos remaining: {items.filter((el : IItem)=> !el.isStriked).length} out of {items.length}</div>
    </div>
  );
}

// Hook
function useLocalStorage(key: string, initialValue: []) {

  interface IItem {
    id: number;
    isStriked: boolean;
    text: string;
  }

  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: IItem[])=> {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default App;
