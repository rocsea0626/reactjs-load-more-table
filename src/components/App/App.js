import React from 'react';
import Container from '@material-ui/core/Container';
import { useRoutes } from 'hookrouter';
import { Users, Projects } from '../../components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';


const Home = () => {
  return (

    <Card>
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/users"
          >Users</Button>
        </ListItem>
        <ListItem button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/projects"
          >Projects</Button>
        </ListItem>
      </List>
    </Card>
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
      maxWidth="md"
      data-testid="app-box"
    >
      {routeResult}

    </Container>
  )

};

export default App;
