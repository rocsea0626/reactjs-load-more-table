import React from 'react';
import Box from "@material-ui/core/Box";
import { A } from 'hookrouter';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import PropTypes from 'prop-types';

export const Nav = (props) => {

  const pathTokens = props.path.split('/');

  if (pathTokens[1] === 'users' || pathTokens[1] === 'projects') {
    return (
      <Box m={2}
        data-testid="nav-box"
      >
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

Nav.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Nav;
