import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;


const getAllSetSongs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/setSongs.json`)
    .then((response) => {
      const duhSetSongs = response.data;
      const setSongs = [];
      if (duhSetSongs !== null) {
        Object.keys(duhSetSongs).forEach((setSongsId) => {
          duhSetSongs[setSongsId].id = setSongsId;
          setSongs.push(duhSetSongs[setSongsId]);
        });
      }
      resolve(setSongs);
    })
    .catch((err) => reject(err));
});

const getAllSetSongsBySetId = (setId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/setSongs.json?orderBy="setId"&equalTo="${setId}"`)
    .then((response) => {
      const duhSetSongs = response.data;
      const setSongs = [];
      if (duhSetSongs !== null) {
        Object.keys(duhSetSongs).forEach((setSongsId) => {
          duhSetSongs[setSongsId].id = setSongsId;
          setSongs.push(duhSetSongs[setSongsId]);
        });
      }
      resolve(setSongs);
    })
    .catch((err) => reject(err));
});

const deleteSetSong = (setSongsId) => axios.delete(`${baseUrl}/setSongs/${setSongsId}.json`);

const postSetSongs = (newSetSongs) => axios.post(`${baseUrl}/setSongs.json`, newSetSongs);

export default {
  getAllSetSongsBySetId,
  deleteSetSong,
  getAllSetSongs,
  postSetSongs,
};
