import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import moment from 'moment';
import {
  ErrorText,
  LoadingAnimation,
  LoadButton
} from '../../components';
import {
  SortOrder
} from '../../constants'

const useStyles = makeStyles({
  table: {
    maxWidth: 1400
  },
  tableHeader: {
    fontWeight: 800
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

export const Users = (props) => {

  const classes = useStyles();

  const {
    order,
    orderBy,
    users,
    isLoading,
    error,
    handleOrderChanged,
    onLoadClicked
  } = props;


  const stableSort = (users, comparator) => {

    // to mantaian sort stabiliy, temporary array holds users with position and sort-value
    const stabalizedUsers = users.map((user, index) => [user, index]);
    const INDEX_USER = 0, INDEX_POS = 1;

    stabalizedUsers.sort((user1, user2) => {

      const order = comparator(user1[INDEX_USER], user2[INDEX_USER]);
      if (order !== 0) return order;
      return user1[INDEX_POS] - user2[INDEX_POS];
    });

    return stabalizedUsers.map((user) => user[INDEX_USER]);
  }

  const getComparator = (order, orderBy) => {
    return order === SortOrder.DESC
      ? (user1, user2) => descendingComparator(user1, user2, orderBy)
      : (user1, user2) => -descendingComparator(user1, user2, orderBy);
  }

  const descendingComparator = (user1, user2, orderBy) => {
    return Number.parseInt(user2[orderBy]) - Number.parseInt(user1[orderBy])
  }

  return (
    <TableContainer component={Paper}>
      <Table
        data-testid="users-table"
        className={classes.table}
      >
        <TableHead >
          <TableRow>
            <TableCell className={classes.tableHeader}>
              <TableSortLabel
                data-testid="users-sort"
                active={true}
                direction={order}
                onClick={handleOrderChanged}
              >
                Date
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell className={classes.tableHeader}>User&nbsp;ID</TableCell>
            <TableCell className={classes.tableHeader}>Old&nbsp;value</TableCell>
            <TableCell className={classes.tableHeader}>New&nbsp;value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(users, getComparator(order, orderBy)).map((user) => (
            <TableRow
              key={user.id}
              data-testid="users-table-row"
            >
              <TableCell
                data-testid="users-table-row-date"
                component="th"
                scope="row"
              >
                {moment(user[orderBy]).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.diff[0].oldValue}</TableCell>
              <TableCell>{user.diff[0].newValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ErrorText
        data-testid="users-error-text"
        show={error ? true : false}
      />
      <LoadingAnimation
        data-testid="users-loading-anim"
        show={isLoading}
      />

      <LoadButton
        data-testid="users-load-btn"
        show={!isLoading}
        onClicked={onLoadClicked}
        hasError={error ? true : false}
      />

    </TableContainer>
  );
};

Users.propTypes = {
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleOrderChanged: PropTypes.func.isRequired,
  onLoadClicked: PropTypes.func.isRequired,
  error: PropTypes.object,
};

export default Users;