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
          setSongData.getAllSetSongs(setId)
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

const completelyRemoveSet = (setId) => new Promise((resolve, reject) => {
  setData.deleteSet(setId)
    .then(() => {
      setSongData.getAllSetSongsBySetId(setId)
        .then((songs) => {
          songs.forEach((song) => setSongData.deleteSetSong(song.id));
          resolve();
        });
    });
});
export default { getAllSetList, completelyRemoveSet };
// get all Songs

// get all sets

// get setSongs by setId

// getAllSetList
