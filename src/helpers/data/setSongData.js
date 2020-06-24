import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllSetSongsBySetId = (setId) => new Promise((resolve, reject) => {
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

const deleteSetSong = (setSongId) => axios.delete(`${baseUrl}/setSongs/${setSongId}.json`);


export default { getAllSetSongsBySetId, deleteSetSong };
