import { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import '../../styles/TodoForm.css';

const TodoForm = ({ onSubmit, loading, priorities }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priorityId, setPriorityId] = useState(1);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('The title is mandatory');
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        priorityId: parseInt(priorityId)
      });
      
      setTitle('');
      setDescription('');
      setPriorityId(1);
      setError('');
    } catch (err) {
      setError('Error creating task', err);
    }
  };

  return (
    <div className="todo-form-card">
      <h2 className="form-title">
        <Plus className="form-title-icon" />
        New task
      </h2>

      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group-todo">
          <label htmlFor="title" className="form-label">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What should you do?"
            className="form-input"
            disabled={loading}
          />
        </div>

        <div className="form-group-todo">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Further details..."
            rows="3"
            className="form-textarea"
            disabled={loading}
          />
        </div>

        <div className="form-group-todo">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            value={priorityId}
            onChange={(e) => setPriorityId(e.target.value)}
            className="form-select"
            disabled={loading}
          >
            {priorities.map((priority) => (
              <option key={priority.id} value={priority.id}>
                {priority.name}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div className="form-error">
            <AlertCircle className="form-error-icon" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="form-submit"
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Creation in progress...
            </>
          ) : (
            <>
              <Plus className="button-icon" />
              Add the task
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;