import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  centerBox: {
    textAlign: "center"
  },
});

export const ErrorText = (props) => {

  const classes = useStyles();
  const { hasError } = props;

  if (hasError) {
    return (
      <Box m={2} className={classes.centerBox}>
        <p>
          We had problems fetching your data. Please try again.
        </p>
      </Box>
    );
  }

  return null;

};

export default ErrorText;
