import TodoItem from './TodoItem';
import { Inbox, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/TodoList.css';

const TodoList = ({ todos, priorities, loading, pageNumber, totalPages, totalCount, onPageChange, onToggle, onUpdate, onDelete }) => {
  if (loading) {
    return (
      <div className="todo-list-card">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list-card">
        <div className="empty-state">
          <div className="empty-icon-container">
            <Inbox className="empty-icon" />
          </div>
          <div className="empty-content">
            <h3 className="empty-title">No tasks found</h3>
            <p className="empty-description">
              Start by creating your first task or modifying your filters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-list-card">
      <div className="list-header">
        <h2 className="list-title">
          My tasks
          <span className="list-count">
            ({totalCount} {totalCount > 1 ? 'tâches' : 'tâche'})
          </span>
        </h2>
      </div>

      <div className="todos-container">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            priorities={priorities}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(pageNumber - 1)}
            disabled={pageNumber === 1}
            className="pagination-btn"
            aria-label="Previous page"
          >
            <ChevronLeft className="pagination-icon" />
            Previous
          </button>

          <div className="pagination-info">
            <span className="pagination-current">Page {pageNumber}</span>
            <span className="pagination-separator">/</span>
            <span className="pagination-total">{totalPages}</span>
          </div>

          <button
            onClick={() => onPageChange(pageNumber + 1)}
            disabled={pageNumber === totalPages}
            className="pagination-btn"
            aria-label="Next page"
          >
            Next
            <ChevronRight className="pagination-icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;