/* eslint-disable import/named */
import {
  posts,
  readPostPrueba,
} from '../model/model-posts.js';
import { storageRef } from '../model/model-storage.js';


export const createPost = (post, user, mode, nameImg, urlImg) => {
  console.log(user);

  // return new Promise((resolve, reject) => {
  // const user = firebase.auth().currentUser.uid;
  posts().add({
    post,
    date: new Date().toLocaleString(),
    idUser: user.uid,
    username: user.displayName,
    photo: user.photoURL,
    privacy: mode,
    nameImg,
    urlImg,
    // likes: userObject.like,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

export const postsMain = () => posts().orderBy('date', 'desc');


// LEER DOCUMENTOS
export const postRead = () => {
  readPostPrueba()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => doc.post);
    });
};

export const upLoadImagePost = (imagenASubir, uid) => {
  storageRef(`photoPosts/${uid}/${imagenASubir.name}`).put(imagenASubir);
};
