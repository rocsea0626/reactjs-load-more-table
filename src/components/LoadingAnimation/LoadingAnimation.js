import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import CenterBox from '../CenterBox/CenterBox';

export const LoadingAnimation = (props) => {

  const { isLoading } = props;

  if (isLoading) {
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    );
  }
  return null;
};

LoadingAnimation.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default LoadingAnimation;
