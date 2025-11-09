import { Filter, Trash2 } from 'lucide-react';
import { FILTER_BUTTONS } from '../../constants';
import '../../styles/TodoFilters.css';

const TodoFilters = ({ filters, setFilters, priorities, onDeleteCompleted, completedCount }) => {

  const handleStatusFilter = (value) => {
    if (value === 'all') {
      const { isCompleted:_, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, isCompleted: value === 'completed' });
    }
  };

  const handlePriorityFilter = (value) => {
    if (value === 'all') {
      const { priorityId:_, ...rest } = filters;
      setFilters(rest);
    } else {
      setFilters({ ...filters, priorityId: parseInt(value) });
    }
  };

  const getActiveStatus = () => {
    if (filters.isCompleted === true) return 'completed';
    if (filters.isCompleted === false) return 'pending';
    return 'all';
  };

  const getActivePriority = () => {
    return filters.priorityId !== undefined ? filters.priorityId : 'all';
  };

  return (
    <div className="filters-card">
      <div className="filters-header">
        <Filter className="filters-icon" />
        <h3 className="filters-title">Filters</h3>
      </div>

      <div className="filters-content">
        <div className="filter-section">
          <label className="filter-label">Status</label>
          <div className="filter-buttons">
            {FILTER_BUTTONS.map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleStatusFilter(btn.value)}
                className={`filter-btn ${getActiveStatus() === btn.value ? 'filter-btn-active' : ''}`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <label className="filter-label">Priority</label>
          <div className="filter-buttons">
            <button
              onClick={() => handlePriorityFilter('all')}
              className={`filter-btn filter-btn-priority ${getActivePriority() === 'all' ? 'filter-btn-priority-active' : ''}`}
            >
              All
            </button>
            {priorities.map((priority) => (
              <button
                key={priority.id}
                onClick={() => handlePriorityFilter(priority.id)}
                className={`filter-btn filter-btn-priority ${getActivePriority() === priority.id ? 'filter-btn-priority-active' : ''}`}
                style={{
                  backgroundColor: getActivePriority() === priority.id ? priority.color : undefined,
                  color: getActivePriority() === priority.id ? 'white' : undefined
                }}
              >
                {priority.name}
              </button>
            ))}
          </div>
        </div>

        {completedCount > 0 && (
          <div className="filter-section filter-section-actions">
            <button onClick={onDeleteCompleted} className="delete-completed-btn">
              <Trash2 className="button-icon" />
              Delete completed tasks ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoFilters;