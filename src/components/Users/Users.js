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
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ErrorText from '../ErrorText/ErrorText';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  centerBox: {
    textAlign: "center"
  },
});

export const Users = () => {

  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.getUsersDiff();
      setLoading(false);
      setError(null);
      setUsers(res.data);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>User&nbsp;ID</TableCell>
            <TableCell>Old&nbsp;value</TableCell>
            <TableCell>New&nbsp;value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.timestamp}
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

      <Box m={2} className={classes.centerBox}>
        <Button variant="contained" color="primary" onClick={fetchData}>
          Load more
        </Button>
      </Box>
    </TableContainer>
  );
};

export default Users;
