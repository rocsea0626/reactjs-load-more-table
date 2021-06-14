import { useState, useEffect } from 'react';

/**
 * Custome hook allows to fetch data with loading and error states
 * @param {number} loadCount: integer used as dependency for useEffect(). Increasing its value will cause re-render the effect.
 */
function useLoadMore(loadCount, loadDataFn) {

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(`useEffect()`);
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await loadDataFn();
        setLoading(false);
        setData((oldData) => [...oldData, ...res.data]);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };

    fetchData();

  }, [loadCount]);

  return [data, error, loading];
}

export default useLoadMore;