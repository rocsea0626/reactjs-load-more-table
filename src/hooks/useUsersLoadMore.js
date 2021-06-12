import { useState, useEffect } from 'react';
import api from '../lib/api';

/**
 * Custome hook allows to fetch users with loading and error states
 * @param {number} loadCount: integer used as dependency for useEffect(). Increasing its value will cause re-render the effect.
 */
function useUsersLoadMore(loadCount) {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await api.getUsersDiff();
        setLoading(false);
        setUsers((prevUsers) => [...prevUsers, ...res.data]);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };

    fetchUsers();

  }, [loadCount]);

  return [users, error, loading];
}

export default useUsersLoadMore;