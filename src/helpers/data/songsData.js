import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;


const getAllSongs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/songs.json`)
    .then((response) => {
      const duhSongs = response.data;
      const songs = [];
      if (duhSongs !== null) {
        Object.keys(duhSongs).forEach((songId) => {
          duhSongs[songId].id = songId;
          songs.push(duhSongs[songId]);
        });
      }
      resolve(songs);
    })
    .catch((err) => reject(err));
});

export default { getAllSongs };
