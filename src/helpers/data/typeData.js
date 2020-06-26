import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllTypesByTypeId = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/type.json`)
    .then((response) => {
      const duhTypes = response.data;
      const types = [];
      if (duhTypes !== null) {
        Object.keys(duhTypes).forEach((typeId) => {
          duhTypes[typeId].id = typeId;
          types.push(duhTypes[typeId]);
        });
      }
      console.log('duh types', types);
      resolve(types);
    })
    .catch((err) => reject(err));
});

export default { getAllTypesByTypeId };
