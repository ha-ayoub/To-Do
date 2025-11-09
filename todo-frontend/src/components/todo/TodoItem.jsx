import { useState } from 'react';
import { Trash2, Edit2, Check, X, Calendar } from 'lucide-react';
import '../../styles/TodoItem.css';

const TodoItem = ({ todo, priorities, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriorityId, setEditPriorityId] = useState(todo.priority.id);

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    await onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || null,
      priorityId: parseInt(editPriorityId)
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriorityId(todo.priority.id);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="todo-item-edit">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
          placeholder="Task title"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="edit-textarea"
          placeholder="Description"
          rows="2"
        />
        <select
          value={editPriorityId}
          onChange={(e) => setEditPriorityId(e.target.value)}
          className="edit-select"
        >
          {priorities.map((priority) => (
            <option key={priority.id} value={priority.id}>
              {priority.name}
            </option>
          ))}
        </select>
        <div className="edit-actions">
          <button onClick={handleSave} className="edit-btn-save">
            <Check className="btn-icon" />
            Save
          </button>
          <button onClick={handleCancel} className="edit-btn-cancel">
            <X className="btn-icon" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`todo-item ${todo.isCompleted ? 'todo-completed' : ''}`}
      style={{ borderLeftColor: todo.priority.color }}
    >
      <div className="todo-content">
        <button
          onClick={() => onToggle(todo.id, todo.isCompleted)}
          className={`todo-checkbox ${todo.isCompleted ? 'checkbox-checked' : ''}`}
        >
          {todo.isCompleted && <Check className="check-icon" />}
        </button>

        <div className="todo-details">
          <div className="todo-header">
            <h3 className={`todo-title ${todo.isCompleted ? 'title-completed' : ''}`}>
              {todo.title}
            </h3>
            <span 
              className="priority-badge"
              style={{ 
                backgroundColor: `${todo.priority.color}20`,
                color: todo.priority.color,
                borderColor: todo.priority.color
              }}
            >
              {todo.priority.name}
            </span>
          </div>

          {todo.description && (
            <p className={`todo-description ${todo.isCompleted ? 'description-completed' : ''}`}>
              {todo.description}
            </p>
          )}

          <div className="todo-metadata">
            <div className="metadata-item">
              <Calendar className="metadata-icon" />
              <span>{formatDate(todo.createdAt)}</span>
            </div>
            {todo.completedAt && (
              <span className="completed-badge">
                <Check size={10}/> Completed on {formatDate(todo.completedAt)}
              </span>
            )}
          </div>
        </div>

        <div className="todo-actions">
          <button onClick={() => setIsEditing(true)} className="action-btn edit-btn" title="Edit">
            <Edit2 className="action-icon" />
          </button>
          <button onClick={() => onDelete(todo.id)} className="action-btn delete-btn" title="Delete">
            <Trash2 className="action-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;