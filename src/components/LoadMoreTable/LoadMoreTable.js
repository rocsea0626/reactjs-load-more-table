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
} from '..';
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

export const LoadMoreTable = (props) => {

  const classes = useStyles();

  const {
    idText,
    order,
    orderBy,
    data,
    isLoading,
    error,
    handleOrderChanged,
    onLoadClicked
  } = props;


  const stableSort = (data, comparator) => {

    // to mantaian sort stabiliy, temporary array holds data with position and sort-value
    const stabalizedData = data.map((data, index) => [data, index]);
    const INDEX_DATA = 0, INDEX_POS = 1;

    stabalizedData.sort((data1, data2) => {

      const order = comparator(data1[INDEX_DATA], data2[INDEX_DATA]);
      if (order !== 0) return order;
      return data1[INDEX_POS] - data2[INDEX_POS];
    });

    return stabalizedData.map((data) => data[INDEX_DATA]);
  }

  const getComparator = (order, orderBy) => {
    return order === SortOrder.DESC
      ? (data1, data2) => descendingComparator(data1, data2, orderBy)
      : (data1, data2) => -descendingComparator(data1, data2, orderBy);
  }

  const descendingComparator = (data1, data2, orderBy) => {
    return Number.parseInt(data2[orderBy]) - Number.parseInt(data1[orderBy])
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
            <TableCell className={classes.tableHeader}>{idText}</TableCell>
            <TableCell className={classes.tableHeader}>Old&nbsp;value</TableCell>
            <TableCell className={classes.tableHeader}>New&nbsp;value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(data, getComparator(order, orderBy)).map((data) => (
            <TableRow
              key={data.id}
              data-testid="users-table-row"
            >
              <TableCell
                data-testid="users-table-row-date"
                component="th"
                scope="row"
              >
                {moment(data[orderBy]).format('YYYY-MM-DD')}
              </TableCell>
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.diff[0].oldValue}</TableCell>
              <TableCell>{data.diff[0].newValue}</TableCell>
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
// diff: [
//   { field: 'name', oldValue: 'John', newValue: 'Bruce' },
// ],

LoadMoreTable.propTypes = {
  idText: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleOrderChanged: PropTypes.func.isRequired,
  onLoadClicked: PropTypes.func.isRequired,
  error: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.string,
    timestamp: PropTypes.number,
    diff: PropTypes.arrayOf(PropTypes.exact({
      field: PropTypes.string,
      oldValue: PropTypes.string,
      newValue: PropTypes.string,
    }))
  })).isRequired,

};

export default LoadMoreTable;