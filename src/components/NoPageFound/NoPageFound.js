import React from 'react';
import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';

export const NoPageFound = () => {

  return (

    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <Typography>Page not found</Typography>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          href="/"
        >Go to Home</Button>
      </Grid>
    </Grid>

  )

};

export default NoPageFound;
