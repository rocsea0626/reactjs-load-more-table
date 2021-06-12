import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { Users } from '../../components'
import { useUsersLoadMore } from '../../hooks'
import {
  SortOrder
} from '../../constants'
export const App = () => {

  const [order, setOrder] = useState(SortOrder.DESC);
  const [loadCount, setLoadCount] = useState(0);
  const [users, error, loading] = useUsersLoadMore(loadCount);

  const handleOrderChanged = () => {
    setOrder(order === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC);
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
