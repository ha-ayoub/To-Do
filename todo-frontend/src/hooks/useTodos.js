import { useState, useEffect, useCallback } from 'react';
import { todoService, priorityService } from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, urgent: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPriorities = async () => {
      try {
        const data = await priorityService.getAll();
        setPriorities(data);
      } catch (err) {
        console.error('Error loading priorities:', err);
      }
    };
    fetchPriorities();
  }, []);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoService.getAll(pageNumber, pageSize, filters);
      setTodos(data.items);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (err) {
      setError('Error loading tasks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, filters]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await todoService.getStats();
      setStats(data);
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }, []);

  const createTodo = async (todoData) => {
    setLoading(true);
    setError(null);
    try {
      await todoService.create(todoData);
      await fetchTodos();
      await fetchStats();
      if (pageNumber !== 1) {
        setPageNumber(1);
      }
    } catch (err) {
      setError('Error creating task.');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, todoData) => {
    setLoading(true);
    setError(null);
    try {
      await todoService.update(id, todoData);
      await fetchTodos();
      await fetchStats();
    } catch (err) {
      setError('Error updating task.');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = async (id, isCompleted) => {
    await updateTodo(id, { isCompleted: !isCompleted });
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await todoService.delete(id);
      await fetchTodos();
      await fetchStats();
    } catch (err) {
      setError('Error deleting task.');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompleted = async () => {
    setLoading(true);
    setError(null);
    try {
      await todoService.deleteCompleted();
      await fetchTodos();
      await fetchStats();
    } catch (err) {
      setError('Error deleting completed tasks.');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page);
    }
  };

  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, [fetchTodos, fetchStats]);

  return {
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
    deleteCompleted,
    refreshTodos: fetchTodos,
  };
};