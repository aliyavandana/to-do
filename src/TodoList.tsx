import React from 'react';
import './App.css';

interface Props {
    items: item[];
}
interface item {
  id : number;
  text: string
}

const TodoList = (props : Props) => {
    return (
      <ul>
        {props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
}

export default TodoList;