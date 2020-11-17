import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import styles from './index.module.scss';

const Overview = props => {
  const { name } = useParams();
  const location = useLocation();

  const [currentEmployee, setCurrentEmployee] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  const employeeCheckList = [];

  useEffect(() => {
    const getData = async employeeName => {
      try {
        const res = await axios.get(
          `//api.additivasia.io/api/v1/assignment/employees/${employeeName}`
        );

        // console.log(`##### ${employeeName} : `, res.data);
        // console.log(
        //   `##### ${employeeName} : `,
        //   res.data[1] && res.data[1]['direct-subordinates']
        // );

        if (name === employeeName) {
          setCurrentEmployee({
            name,
            title: res.data[0],
          });
        } else {
          setEmployeeList(prevEmployeeList => [
            ...prevEmployeeList,
            {
              name: employeeName,
              title: res.data[0],
            },
          ]);
        }

        if (
          res.data[0] !== 'employee' &&
          res.data[1] &&
          res.data[1]['direct-subordinates']
        ) {
          res.data[1]['direct-subordinates'].forEach(employee => {
            // console.log('##### employeeCheckList', employeeCheckList, employee);
            if (!employeeCheckList.includes(employee)) {
              employeeCheckList.push(employee);

              getData(employee);
            }
          });
        }
      } catch (e) {
        console.error('##### e', e.message, e.status);
        setErrorMsg(
          'There has been an error in your request. Please try again.'
        );
      }
    };

    getData(name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    // console.log('##### employeeCheckList', employeeCheckList);
    setCurrentEmployee({});
    setEmployeeList([]);
    setErrorMsg('');
  }, [location]);

  return (
    <Container maxWidth='sm' className={styles.Overview}>
      <h1>Employee Overview</h1>

      {!(
        Object.keys(currentEmployee).length === 0 &&
        currentEmployee.constructor === Object
      ) && (
        <div className={styles.Overview__currentEmployee}>
          <p>Subordinates of</p>
          <List className={styles.Overview__list}>
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className={styles.Overview__currentEmployeeAvatar}
                  src={`https://i.pravatar.cc/100?u=${currentEmployee.name}`}
                />
              </ListItemAvatar>
              <ListItemText
                primary={currentEmployee.name}
                secondary={currentEmployee.title}
              />
            </ListItem>
          </List>
        </div>
      )}

      {employeeList.length ? (
        <div className={styles.Overview__listWrapper}>
          <List className={styles.Overview__list}>
            {employeeList
              .sort((a, b) => {
                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }

                // names must be equal
                return 0;
              })
              .map((e, i) => (
                <ListItem
                  button
                  component={Link}
                  key={i}
                  to={`/overview/${e.name}`}>
                  <ListItemAvatar>
                    <Avatar src={`https://i.pravatar.cc/100?u=${e.name}`} />
                  </ListItemAvatar>
                  <ListItemText primary={e.name} secondary={e.title} />
                </ListItem>
              ))}
          </List>
          {/* <ul className={styles.Overview__list}>
            {employeeList.map(e => (
              <li key={e}>{e}</li>
            ))}
          </ul> */}
        </div>
      ) : errorMsg ? (
        <small className={styles.Overview__errorMsg}>{errorMsg}</small>
      ) : (
        <small className={styles.Overview__emptyMsg}>
          No subordinate found.
        </small>
      )}
    </Container>
  );
};

export default withRouter(Overview);
