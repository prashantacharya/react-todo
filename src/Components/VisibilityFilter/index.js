import React, { Component } from 'react';
import './VisibilityFilter.css';

class VisibilityFilter extends Component {
  render() {
    const { visibility, toggleVisibility } = this.props;
    console.log(visibility, toggleVisibility);
    return (
      <div className="visibility-filters">
        <button
          className={visibility === 'all' ? 'selected' : ''}
          onClick={() => {
            toggleVisibility('all');
          }}
        >
          All
        </button>
        <button
          className={visibility === 'complete' ? 'selected' : ''}
          onClick={() => {
            toggleVisibility('complete');
          }}
        >
          Complete
        </button>
        <button
          className={visibility === 'incomplete' ? 'selected' : ''}
          onClick={() => {
            toggleVisibility('incomplete');
          }}
        >
          Incomplete
        </button>
      </div>
    );
  }
}

export default VisibilityFilter;
