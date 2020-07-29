import React, { Component, useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import './todoList.css';

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            item={todo}
            removeTodo={this.props.removeTodo}
            changeTodoStatus={this.props.changeTodoStatus}
          />
        ))}
      </ul>
    );
  }
}

function TodoItem({ item, removeTodo, changeTodoStatus }) {
  const [isPriortized, setIsPriortized] = useState(false);
  const todoClass = item.completed ? 'complete' : 'incomplete';

  const handleDelete = () => {
    removeTodo(item.id);
  };

  const handleStatusChange = () => {
    changeTodoStatus(item.id);
  };

  const handlePriorityChange = () => {
    setIsPriortized(!isPriortized);
  };

  return (
    <li className={todoClass}>
      <span>{item.value}</span>
      <div>
        <button onClick={handlePriorityChange}>
          {isPriortized ? <AiFillStar /> : <AiOutlineStar />}
        </button>
        <button onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>
        <button onClick={handleStatusChange}>
          {item.completed ? <TiTimes /> : <TiTick />}
        </button>
      </div>
    </li>
  );
}

export default TodoList;
