import React from 'react';
import Container from '@material-ui/core/Container';
import { useRoutes } from 'hookrouter';
import { Users, Projects, Nav, NoPageFound } from '../../components'
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

const Home = () => {
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
        <Button
          variant="outlined"
          color="primary"
          size="large"
          href="/users"
        >Users</Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          href="/projects"
        >Projects</Button>
      </Grid>
    </Grid>

  )
}

export const App = () => {

  const routes = {
    "/": () => <Home />,
    "/users": () => <Users />,
    "/projects": () => <Projects />
  }

  const routeResult = useRoutes(routes);

  return (
    <Container
      className="app"
      data-testid="app-box"
    >
      <Nav />
      {routeResult || <NoPageFound />}

    </Container>
  )

};

export default App;
