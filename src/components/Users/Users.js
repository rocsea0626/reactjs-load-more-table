import React, { useState } from 'react';
import {
  LoadMoreTable,
} from '../../components';
import {
  SortOrder
} from '../../constants'
import api from '../../lib/api';
import { useLoadMore } from '../../hooks'

export const Users = (props) => {

  const [order, setOrder] = useState(SortOrder.DESC);
  const [loadCount, setLoadCount] = useState(0);
  const [data, error, loading] = useLoadMore(loadCount, api.getUsersDiff);

  const handleOrderChanged = () => {
    setOrder(order === SortOrder.DESC ? SortOrder.ASC : SortOrder.DESC);
  }

  const handleLoadMore = () => {
    setLoadCount((prevLoadCount) => prevLoadCount + 1);
  }

  return (
    <LoadMoreTable
      idText='User&nbsp;ID'
      data={data}
      error={error}
      isLoading={loading}
      order={order}
      orderBy='timestamp'
      handleOrderChanged={handleOrderChanged}
      onLoadClicked={handleLoadMore}
    />
  );


};

export default Users;