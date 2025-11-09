import { CheckCircle2, Circle, AlertCircle, ListTodo } from 'lucide-react';
import '../../styles/TodoStats.css';

const TodoStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total',
      value: stats.total,
      icon: ListTodo,
      colorClass: 'stat-blue'
    },
    {
      label: 'In progress',
      value: stats.pending,
      icon: Circle,
      colorClass: 'stat-amber'
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      colorClass: 'stat-green'
    },
    {
      label: 'Urgent',
      value: stats.urgent,
      icon: AlertCircle,
      colorClass: 'stat-red'
    }
  ];

  return (
    <div className="stats-grid">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className={`stat-card ${stat.colorClass}`}>
            <div className="stat-content">
              <div className="stat-info">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-icon-container">
                <Icon className="stat-icon" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoStats;