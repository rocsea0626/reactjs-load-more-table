import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import CenterBox from '../CenterBox/CenterBox';
import Button from '@material-ui/core/Button';


export const LoadButton = (props) => {

  const { hasError, onClicked, isLoading } = props;

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

export default LoadButton;
