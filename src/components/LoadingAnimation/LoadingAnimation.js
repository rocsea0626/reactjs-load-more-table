import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import CenterBox from '../CenterBox/CenterBox';

export const LoadingAnimation = (props) => {

  const { show } = props;

  if (show) {
    return (
      <CenterBox>
        <CircularProgress
          data-testid="loading-animation-box"
        />
      </CenterBox>
    );
  }
  return null;
};

LoadingAnimation.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default LoadingAnimation;
