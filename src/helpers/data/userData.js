import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/user.json`)
    .then((response) => {
      const duhUsers = response.data;
      const users = [];
      if (duhUsers !== null) {
        Object.keys(duhUsers).forEach((userId) => {
          duhUsers[userId].id = userId;
          users.push(duhUsers[userId]);
        });
      }
      resolve(users);
    })
    .catch((err) => reject(err));
});

export default { getAllUsers };
