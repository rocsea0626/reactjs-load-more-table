import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import CenterBox from '../CenterBox/CenterBox';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  errorText: {
    color: "red",
  },
});

export const ErrorText = (props) => {

  const { hasError } = props;
  const classes = useStyles();

  if (hasError) {
    return (
      <CenterBox>
        <Typography className={classes.errorText}>
          We had problems fetching your data.Please try again.
        </Typography >
      </CenterBox>
    );
  }

  return null;

};

export default ErrorText;
