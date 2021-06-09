import React, { useEffect, useState } from 'react';
import api from '../../lib/api';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import ErrorText from '../ErrorText/ErrorText';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import LoadButton from '../LoadButton/LoadButton';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

export const Users = () => {

  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.getUsersDiff();
      setLoading(false);
      setError(null);
      setUsers((prevUsers) => [...prevUsers, ...res.data]);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

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

  const handleRequestSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="users_table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={sortOrder}
                onClick={() => handleRequestSort()}
              >
                Date
                <span className={classes.visuallyHidden}>
                  {sortOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              </TableSortLabel>
            </TableCell>
            <TableCell>User&nbsp;ID</TableCell>
            <TableCell>Old&nbsp;value</TableCell>
            <TableCell>New&nbsp;value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(users, getComparator(sortOrder, 'timestamp')).map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {moment(user.timestamp).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.diff[0].oldValue}</TableCell>
              <TableCell>{user.diff[0].newValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ErrorText hasError={error ? true : false} />
      <LoadingAnimation isLoading={loading} />

      <LoadButton
        isLoading={loading}
        onClicked={fetchData}
        hasError={error ? true : false}
      />

    </TableContainer>
  );
};

export default Users;