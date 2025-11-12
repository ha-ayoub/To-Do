import { useTodos } from '../hooks/useTodos';
import TodoStats from './todo/TodoStats';
import TodoForm from './todo/TodoForm';
import TodoFilters from './todo/TodoFilters';
import TodoList from './todo/TodoList';
import Footer from './Layout/Footer';
import { AlertCircle } from 'lucide-react';

function TodoApp() {
  const {
    todos,
    priorities,
    stats,
    loading,
    error,
    filters,
    setFilters,
    pageNumber,
    totalPages,
    totalCount,
    goToPage,
    createTodo,
    updateTodo,
    toggleComplete,
    deleteTodo,
    deleteCompleted
  } = useTodos();

  const handleDeleteCompleted = async () => {
    if (window.confirm(`Are you sure you want to delete the completed task(s) from ${stats.completed}?`)) {
      try {
        await deleteCompleted();
      } catch (err) {
        console.error('Error during deletion:', err);
      }
    }
  };

  return (
    <div className="todo-app-container">
      <main className="main-content">
        {error && (
          <div className="error-alert">
            <AlertCircle />
            <div className="error-alert-content">
              <p>An error has occurred</p>
              <p>{error}</p>
            </div>
          </div>
        )}

        <TodoStats stats={stats} />

        <div className="content-grid">
          <div className="sidebar">
            <TodoForm 
              onSubmit={createTodo} 
              loading={loading}
              priorities={priorities}
            />
            <TodoFilters
              filters={filters}
              setFilters={setFilters}
              priorities={priorities}
              onDeleteCompleted={handleDeleteCompleted}
              completedCount={stats.completed}
            />
          </div>

          <div>
            <TodoList
              todos={todos}
              priorities={priorities}
              loading={loading}
              pageNumber={pageNumber}
              totalPages={totalPages}
              totalCount={totalCount}
              onPageChange={goToPage}
              onToggle={toggleComplete}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          </div>
        </div>
      </main>

        <Footer />
    </div>
  );
}

export default TodoApp;