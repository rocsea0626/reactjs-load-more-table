import React from 'react';
import Box from "@material-ui/core/Box";
import { A, usePath } from 'hookrouter';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

export const Nav = () => {
  const path = usePath();
  const pathTokens = path.split('/');

  if (pathTokens[1] === 'users' || pathTokens[1] === 'projects') {
    return (
      <Box m={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <A className='Link' href='/'>
            Home
          </A>
          <Typography color="textPrimary">{pathTokens[1]}</Typography>
        </Breadcrumbs>

      </Box>
    )
  }
  return null
};

export default Nav;
