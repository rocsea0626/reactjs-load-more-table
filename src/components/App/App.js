import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import Container from '@material-ui/core/Container';
import Users from '../Users/Users'

export const App = () => {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState('desc');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
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

  const handleOrderChanged = () => {
    setOrder(order === 'desc' ? 'asc' : 'desc');
  }

  return (
    <Container
      className="app"
      data-testid="app-box"
    >
      <Users
        users={users}
        error={error}
        isLoading={loading}
        order={order}
        orderBy='timestamp'
        handleOrderChanged={handleOrderChanged}
        onLoadClicked={fetchData}
      />
    </Container>
  );
};

export default App;
