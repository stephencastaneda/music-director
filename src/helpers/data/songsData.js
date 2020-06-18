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

const getSingleSong = (songId) => axios.get(`${baseUrl}/songs/${songId}.json`);

const postSong = (newSong) => axios.post(`${baseUrl}/songs.json`, newSong);

const deleteSong = (songId) => axios.delete(`${baseUrl}/songs/${songId}.json`);


export default {
  getAllSongs,
  getSingleSong,
  postSong,
  deleteSong,
};
