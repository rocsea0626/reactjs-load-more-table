import React from 'react';
import PropTypes from 'prop-types';
import CenterBox from '../CenterBox/CenterBox';
import Button from '@material-ui/core/Button';


export const LoadButton = (props) => {

  const {
    hasError,
    onClicked,
    isLoading
  } = props;

  if (isLoading) {
    return null;
  }

  return (
    <CenterBox>
      <Button variant="contained" color="primary" onClick={onClicked}>
        {hasError ? 'Retry' : 'Load more'}
      </Button>
    </CenterBox>
  );

};

LoadButton.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  onClicked: PropTypes.func.isRequired,
};

export default LoadButton;
