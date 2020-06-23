import axios from 'axios';
import apiKeys from '../apiKeys.json';

import setData from './setData';
import setSongData from './setSongData';
import songsData from './songsData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;


const getAllSetList = (setId) => new Promise((resolve, reject) => {
  setData.getAllSets()
    .then((sets) => {
      songsData.getAllSongs()
        .then((songs) => {
          setSongData.getAllSetSongsBySetId(setId)
            .then((setSongs) => {
              console.log(sets);
              console.log(songs);
              console.log(setSongs);
            });
        });
    })
    .catch((err) => reject(err));
});

export default { getAllSetList };
// get all Songs

// get all sets

// get setSongs by setId

// getAllSetList
