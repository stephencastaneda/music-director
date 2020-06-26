import axios from 'axios';
import apiKeys from '../apiKeys.json';

import setData from './setData';
import setSongData from './setSongData';
import songsData from './songsData';
import resourcesData from './resourcesData';
import typesData from './typeData';

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

const getAllTypesWithResources = (songId) => new Promise((resolve, reject) => {
  console.log('the song id', songId);
  resourcesData.getAllResourcesBySongId(songId)
    .then((resources) => {
      const allResources = [];
      typesData.getAllTypesByTypeId()
        .then((types) => {
          const resourceType = resources.map((resource) => ({
            name: resource.resourceName,
            url: resource.url,
            icon: types.find((type) => resource.typeId === type.id),
          }));
          console.log('the resource type', resourceType);
          resolve(resourceType);
        });
    })
    .catch((err) => reject((err)));
});

export default { getAllSetList, completelyRemoveSet, getAllTypesWithResources };
// get all Songspe

// get all sets

// get setSongs by setId

// getAllSetList
