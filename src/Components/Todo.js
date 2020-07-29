import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

import './todo.css';
import VisibilityFilter from './VisibilityFilter';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [
        {
          id: 1,
          completed: false,
          value: 'test',
        },
      ],
      visibility: 'all',
      searchKeyword: '',
    };
  }

  insertTodo = (text) => {
    const newTodo = { id: Date.now(), value: text, completed: false };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  removeTodo = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: updatedTodos,
    });
  };

  changeTodoStatus = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id !== id) return todo;
      else return { ...todo, completed: !todo.completed };
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  toggleVisibility = (visibility) => {
    this.setState({
      visibility,
    });
  };

  clearTodos = () => {
    this.setState({
      todos: [],
    });
  };

  render() {
    const completedTasks = this.state.todos.filter((todo) => todo.completed)
      .length;

    let todos;
    if (this.state.visibility === 'complete') {
      todos = this.state.todos.filter((todo) => todo.completed);
    } else if (this.state.visibility === 'incomplete') {
      todos = this.state.todos.filter((todo) => !todo.completed);
    } else {
      todos = this.state.todos;
    }

    todos = todos.filter((item) =>
      item.value.toLowerCase().includes(this.state.searchKeyword.toLowerCase())
    );

    return (
      <div>
        <h1>Todo List</h1>

        <AddTodo insertTodo={this.insertTodo} />

        <p className="task-count">
          You have {this.state.todos.length - completedTasks} remaining{' '}
          {this.state.todos.length === 1 ? 'job' : 'jobs'}.
        </p>

        <VisibilityFilter
          visibility={this.state.visibility}
          toggleVisibility={this.toggleVisibility}
        />

        <TodoList
          todoList={todos}
          removeTodo={this.removeTodo}
          changeTodoStatus={this.changeTodoStatus}
        />

        {todos.length > 0 && (
          <button className="clear-btn" onClick={this.clearTodos}>
            Clear All
          </button>
        )}
      </div>
    );
  }
}

export default Todo;
