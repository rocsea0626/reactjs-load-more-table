import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

ErrorText.propTypes = {
  hasError: PropTypes.bool.isRequired,
};

export default ErrorText;
