import React, {useState} from 'react';
import TodoList from './TodoList'
import './App.css';

function App() {
  const [items, setItems] = useState<IItem[]>([]);
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

  const getActiveTodos = () => {
    console.log('in get active todos')
    let count = 0;
    items.forEach(el => {
      if(!el.isStriked)  {
        count++
      }
      console.log(count)
      return count;
    })
  }

  return (
    <div>
      <h3>TODO List</h3>
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
      <TodoList items={items} changeItemState={changeItemState}/>
      <div>Total Todos remaining: {items.filter(el=> !el.isStriked).length} out of {items.length}</div>
    </div>
  );
}

export default App;
