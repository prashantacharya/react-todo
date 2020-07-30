import React, { Component } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

import './todo.css';
import VisibilityFilter from './VisibilityFilter';
import { getFromLocalStorage, saveToLocalStorage } from '../Utils/localstorage';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      visibility: 'all',
      searchKeyword: '',
    };
  }

  componentDidMount() {
    const storedItem = getFromLocalStorage('todos');
    this.setState({
      todos: storedItem || [],
    });
  }

  insertTodo = (text) => {
    const newTodo = { id: Date.now(), value: text, completed: false };
    this.setState(
      (state) => ({ todos: [...state.todos, newTodo] }),
      () => {
        saveToLocalStorage('todos', this.state.todos);
      }
    );
  };

  removeTodo = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState(
      {
        todos: updatedTodos,
      },
      () => {
        saveToLocalStorage('todos', this.state.todos);
      }
    );
  };

  changeTodoStatus = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id !== id) return todo;
      else return { ...todo, completed: !todo.completed };
    });

    this.setState(
      {
        todos: updatedTodos,
      },
      () => {
        saveToLocalStorage('todos', this.state.todos);
      }
    );
  };

  toggleVisibility = (visibility) => {
    this.setState({
      visibility,
    });
  };

  clearTodos = () => {
    this.setState(
      {
        todos: [],
      },
      () => {
        saveToLocalStorage('todos', this.state.todos);
      }
    );
  };

  handleSearchInputChange = (event) => {
    this.setState({
      searchKeyword: event.target.value,
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

        {this.state.todos.length > 0 && (
          <VisibilityFilter
            visibility={this.state.visibility}
            toggleVisibility={this.toggleVisibility}
          />
        )}

        {this.state.todos.length > 0 && (
          <div className="search-form">
            <label>Search Todos</label>
            <br />
            <input
              value={this.state.searchKeyword}
              onChange={this.handleSearchInputChange}
              placeholder="Eg: Dance"
            />
          </div>
        )}

        <TodoList
          todoList={todos}
          removeTodo={this.removeTodo}
          changeTodoStatus={this.changeTodoStatus}
        />

        {this.state.todos.length > 0 && (
          <button className="clear-btn" onClick={this.clearTodos}>
            Clear All
          </button>
        )}
      </div>
    );
  }
}

export default Todo;
