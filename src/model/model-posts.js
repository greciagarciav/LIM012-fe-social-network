/* eslint-disable no-undef */
// CREAR LA COLECCION DE POST
// import { models } from '../model/model-index.js';

const posts = () => firebase.firestore().collection('post');

const editPost = (id, newPost) => firebase.firestore().collection('post').doc(id).update({
  post: newPost,
});

const deletePost = (id) => firebase.firestore().collection('post').doc(id).delete();

const updateUserNamePost = (id, username) => firebase.firestore().collection('post').doc(id).update({
  username,
});

const updateAllPostUsername = (userId, username) => {
  firebase.firestore()
    .collection('post').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().idUser === userId) {
          updateUserNamePost(doc.id, username);
        }
      });
    });
};

// Con arrayUnion(), se pueden agregar elementos a un arreglo
const addLikePost = (idPost, idUser) => firebase.firestore().collection('post')
  .doc(idPost)
  .update({
    likes: firebase.firestore.FieldValue.arrayUnion(idUser),
  });

// SUBIR LA IMAGEN AL STORAGE, PARA OBTENER LA URL DE LA IMG
const subirImagenFirebase = (imagenASubir) => new Promise((resolve, reject) => {
  // const imagenASubir = document.querySelector('#uploadImg').files[0];
  const nameImg = `${+new Date()}- ${imagenASubir.name}`;
  const metadata = { tipoFile: imagenASubir.type };
  const uploadTask = firebase.storage().ref().child(nameImg).put(imagenASubir, metadata);
  uploadTask.then((snapshot) => {
    snapshot.ref.getDownloadURL().then((url) => {
      resolve(url);
      // console.log('url: ', url);
    }).catch((err) => {
      reject(err);
    });
  });
});

const createPost = (post, user, mode, username, photo, imagenASubir) => {
  // console.log(user);
  const imagenASubir1 = imagenASubir.files[0];
  // console.log('imagenAsubir: ', imagenASubir1);
  if (imagenASubir1 === undefined) {
    posts().add({
      post,
      date: new Date().toLocaleString(),
      idUser: user.uid,
      username,
      photo,
      privacy: mode,
      urlImg: '',
      likes: [],
      // likes: userObject.like,
    })
      .then(() => {
        // .then((docRef) => {
        // console.log('Document written with ID: ', docRef.id);
        // sessionStorage.removeItem('imgNewPost');
      })
      .catch(() => {
        // console.error('Error adding document: ', error);
      });
  } else {
    subirImagenFirebase(imagenASubir1)
      .then((url) => {
        posts().add({
          post,
          date: new Date().toLocaleString(),
          idUser: user.uid,
          username,
          photo,
          privacy: mode,
          urlImg: url,
          likes: [],
          // likes: userObject.like,
        })
          .then(() => {
            // console.log('Document written with ID: ', docRef.id);
            // imagenASubir.dispatchEvent(new Event('change'));
          })
          .catch(() => {
            // console.error('Error adding document: ', error);
          });
      });
  }
};

// EL ORDEN COMO QUE SE PINTARAN LOS POST
const postsMain = (callback) => posts().orderBy('date', 'desc').onSnapshot((query) => {
  const getPost = [];
  query.forEach((post) => {
    getPost.push({
      id: post.id,
      ...post.data(),
    });
  });
  callback(getPost);
});

// LEER DOCUMENTOS PARA PROFILE
const readPostProfile = (idUser, callback) => posts().where('idUser', '==', idUser).orderBy('date', 'desc').onSnapshot((query) => {
  const getPost = [];
  query.forEach((post) => {
    getPost.push({
      id: post.id,
      ...post.data(),
    });
  });
  callback(getPost);
});

export default {
  editPost,
  deletePost,
  updateAllPostUsername,
  addLikePost,
  createPost,
  postsMain,
  readPostProfile,
};
