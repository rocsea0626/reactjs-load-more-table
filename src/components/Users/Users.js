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

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
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


  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
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