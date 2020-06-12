import React from 'react';
import './App.css';

interface Props {
    items: item[];
    changeItemState: Function;
}
interface item {
  id : number;
  text: string,
  isStriked: boolean
}

const TodoList = (props : Props) => {
    return (
      <ul>
        {props.items.map(item => (
          item.isStriked?
          <li onClick={() => props.changeItemState(item.text)} key={item.id}><del>{item.text}</del></li>
:          <li onClick={() => props.changeItemState(item.text)} key={item.id}>{item.text}</li>
          ))}
      </ul>
    );
}

export default TodoList;