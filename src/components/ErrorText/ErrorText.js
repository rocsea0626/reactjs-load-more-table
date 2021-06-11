import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CenterBox } from '../../components';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  errorText: {
    color: "red",
  },
});

export const ErrorText = (props) => {

  const { show } = props;
  const classes = useStyles();

  if (show) {
    return (
      <CenterBox data-testid="error-text-box">
        <Typography className={classes.errorText}>
          We had problems fetching your data.Please try again.
        </Typography >
      </CenterBox >
    );
  }
  return null;
};

ErrorText.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default ErrorText;
