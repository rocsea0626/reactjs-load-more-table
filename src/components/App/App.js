import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Users from '../Users/Users'
import { useUsersLoadMore } from '../../hooks'

export const App = () => {

  const [order, setOrder] = useState('desc');
  const [loadCount, setLoadCount] = useState(0);
  const [users, error, loading] = useUsersLoadMore(loadCount);

  const handleOrderChanged = () => {
    setOrder(order === 'desc' ? 'asc' : 'desc');
  }

  const handleLoadMore = () => {
    setLoadCount((prevLoadCount) => prevLoadCount + 1);
  }

  return (
    <Container
      className="app"
      maxWidth="md"
      data-testid="app-box"
    >
      <Users
        users={users}
        error={error}
        isLoading={loading}
        order={order}
        orderBy='timestamp'
        handleOrderChanged={handleOrderChanged}
        onLoadClicked={handleLoadMore}
      />
    </Container>
  );
};

export default App;
