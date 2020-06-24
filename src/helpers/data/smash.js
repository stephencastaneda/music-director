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
              const finalSets = [];
              sets.forEach((set) => {
                const newSet = { ...set };
                newSet.songs = [];
                const selectedSetSongs = setSongs.filter((x) => x.setId === set.id);
                selectedSetSongs.forEach((selectedSetSong) => {
                  const selectedSong = songs.find((x) => x.id === selectedSetSong.songId);
                  newSet.songs.push(selectedSong);
                });
                finalSets.push(newSet);
              });
              resolve(finalSets);
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
