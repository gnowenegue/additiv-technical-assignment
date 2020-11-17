import React, { useState } from 'react';
import { withRouter } from 'react-router';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

import styles from './index.module.scss';

const Home = props => {
  const [name, setName] = useState('');

  const { history } = props;

  const onChangeHandler = e => {
    setName(e.target.value);
  };

  const onClickHandler = e => {
    history.push(`/overview/${name}`);
  };

  return (
    <Container maxWidth='sm' className={styles.Home}>
      <h1>Employee Explorer</h1>
      <div className={styles.Home__form}>
        <TextField
          label="Enter employee's name"
          className={styles.Home__txtField}
          value={name}
          onChange={onChangeHandler}
        />
        <Button
          variant='contained'
          color='primary'
          size='medium'
          startIcon={<SearchIcon />}
          className={styles.Home__searchBtn}
          onClick={onClickHandler}>
          Search
        </Button>
      </div>
    </Container>
  );
};

export default withRouter(Home);
