import React from 'react';
import UsersList from './containers/repositoriesList/RepositoriesList';
import UsersSearchInput from './components/usersSearchInput/UsersSearchInput';
import styles from './App.module.css';
import { Container } from 'semantic-ui-react';

function App() {
  return <div className={styles.app}>
    <Container className={styles.container} text>
      <UsersSearchInput />
      <UsersList />
    </Container>
  </div>
}

export default App;
