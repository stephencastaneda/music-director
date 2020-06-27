import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllResourcesBySongId = (songId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/resources.json?orderBy="songId"&equalTo="${songId}"`)
    .then((response) => {
      const duhResources = response.data;
      const resources = [];
      if (duhResources !== null) {
        Object.keys(duhResources).forEach((resourcesId) => {
          duhResources[resourcesId].id = resourcesId;
          resources.push(duhResources[resourcesId]);
        });
      }
      resolve(resources);
    })
    .catch((err) => reject(err));
});

const getAllResources = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/resources.json`)
    .then((response) => {
      const duhResources = response.data;
      const resources = [];
      if (duhResources !== null) {
        Object.keys(duhResources).forEach((resourcesId) => {
          duhResources[resourcesId].id = resourcesId;
          resources.push(duhResources[resourcesId]);
        });
      }
      resolve(resources);
    })
    .catch((err) => reject(err));
});

const postResource = (newResource) => axios.post(`${baseUrl}/resources.json`, newResource);


const deleteResource = (resourcesId) => axios.delete(`${baseUrl}/songs/${resourcesId}.json`);

export default {
  getAllResourcesBySongId,
  getAllResources,
  deleteResource,
  postResource,
};
