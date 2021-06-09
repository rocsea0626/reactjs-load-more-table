import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const LoadingAnimation = (props) => {

  const { isLoading } = props;

  if (isLoading) {
    return (
      <CircularProgress />
    );
  }

  return null;

};

export default LoadingAnimation;
