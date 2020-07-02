// CREAR LA COLECCIÓN DE POST
const posts = () => firebase.firestore().collection('post');

// ACTUALIZAR INPUT DE POST
const editPost = (id, newPost) => firebase.firestore().collection('post').doc(id).update({
  post: newPost,
});

// ELIMINAR LA COLECCIÓN POST
const deletePost = (id) => firebase.firestore().collection('post').doc(id).delete();

// ACTUALIZAR NOMBRE DE USUARIO

// SUBIR LA IMAGEN AL STORAGE, PARA OBTENER LA URL DE LA IMG
const subirImagenFirebase = (imagenASubir) => new Promise((resolve, reject) => {
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

// ALMACENAR, EN LA COLECCION DE POST
const createPost = (post, user, mode, username, photo, imagenASubir) => {
  // console.log(user);
  const imagenASubir1 = imagenASubir.files[0];
  if (imagenASubir1 === undefined) {
    return posts().add({
      post,
      date: new Date().toLocaleString(),
      idUser: user.uid,
      username,
      photo,
      privacy: mode,
      urlImg: '',
      likes: [],
    });
  }
  return subirImagenFirebase(imagenASubir1)
    .then((url) => posts().add({
      post,
      date: new Date().toLocaleString(),
      idUser: user.uid,
      username,
      photo,
      privacy: mode,
      urlImg: url,
      likes: [],
    }));
};

// EL ORDEN COMO QUE SE PINTARAN LOS POST
const postsMain = (callback) => posts().orderBy('date', 'desc')
  .onSnapshot((query) => {
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
const readPostProfile = (idUser, callback) => posts().where('idUser', '==', idUser).orderBy('date', 'desc')
  .onSnapshot((query) => {
    const getPost = [];
    query.forEach((post) => {
      getPost.push({
        id: post.id,
        ...post.data(),
      });
    });
    callback(getPost);
  });

const updateUserNamePost = (id, username) => firebase.firestore().collection('post').doc(id).update({
  username,
});

// ACTUALIZAR NOMBRE DE USUARIO EN TODOS LOS POST
const updateAllPostUsername = (userId, username) => firebase.firestore()
  .collection('post').get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (doc.data().idUser === userId) {
        updateUserNamePost(doc.id, username);
      }
    });
  });

// ACTUALIZAR LA PROPIEDAD O KEY (LIKES)
const updateLikes = (id, likes) => posts().doc(id).update({ likes });

export default {
  editPost,
  deletePost,
  updateAllPostUsername,
  createPost,
  postsMain,
  readPostProfile,
  updateLikes,
  subirImagenFirebase,
};
