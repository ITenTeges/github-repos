import React from 'react';
import UsersList from './features/repositoriesList/RepositoriesList';
import UsersSearchInput from './features/usersSearchInput/UsersSearchInput';
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
