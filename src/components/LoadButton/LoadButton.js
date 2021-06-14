import React from 'react';
import PropTypes from 'prop-types';
import { CenterBox } from '../../components';
import Button from '@material-ui/core/Button';


export const LoadButton = (props) => {

  const {
    hasError,
    onClicked,
    show
  } = props;

  if (show) {
    return (
      <CenterBox data-testid="load-btn-box">
        <Button
          data-testid="load-btn"
          variant="contained"
          color="primary"
          onClick={onClicked}>
          {hasError ? 'Retry' : 'Load more'}
        </Button>
      </CenterBox>
    );
  }
  return null;
};

LoadButton.propTypes = {
  show: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  onClicked: PropTypes.func,
};

export default LoadButton;
