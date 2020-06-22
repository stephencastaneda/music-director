import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;


const getAllSets = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/sets.json`)
    .then((response) => {
      const duhSets = response.data;
      const sets = [];
      if (duhSets !== null) {
        Object.keys(duhSets).forEach((setId) => {
          duhSets[setId].id = setId;
          sets.push(duhSets[setId]);
        });
      }
      resolve(sets);
    })
    .catch((err) => reject(err));
});

export default { getAllSets };
