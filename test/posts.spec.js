import '../__mock__/mock.js';

import { models } from '../src/model/model-index.js';

firebase.firestore().collection('post').doc('FCwyOleS2ooEYZrGpue3').set({
  date: '26/6/2020 11:40:55',
  idUser: 'owe55NuhqjTJKIQQQ4Z98IavJ0i2',
  likes: [],
  photo: 'https://lh5.googleusercontent.com/-wKhdIQgHjwE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnVyZrmN8eeqVDK3xOlucO70BjfoA/photo.jpg',
  post: 'hola',
  privacy: 'privacy',
  urlImg: '',
  username: 'Rosmery',
});

describe('uploadImage', () => {
  // const imagenAsubir = { files: ['estrella.jpg'] };

  // const file = { name: 'hola.png', type: 'image/png' };
  test('should return the path of the img file', () => models.posts.createPost('hola de test', 'owe55NuhqjTJKIQQQ4Z98IavJ0i2', '', 'Pepitoi', '', { files: ['estrella.jpg'] })
    .then((doc) => expect(doc.data.urlImg).toBe('/PostsImages/estrella.jpg')));
});

const idUser = { uid: 'owe55NuhqjTJKIQQQ4Z98IavJ0i2' };

describe('editPost', () => {
  it('Deberia de poder editar un post', (done) => models.posts.editPost('FCwyOleS2ooEYZrGpue3', 'Nuevo post')
    .then(() => {
      const callback = (commentss) => {
        const result = commentss.find((element) => element.id === 'FCwyOleS2ooEYZrGpue3');
        expect(result.post).toBe('Nuevo post');
        done();
      };
      models.posts.postsMain(callback);
    }));
});
describe('updateUserNamePost', () => {
  it('Actualiza el username en todos sus posts', (done) => models.posts.updateAllPostUsername(idUser.uid, 'RosmeryNew')
    .then(() => {
      const callback = (post) => {
        const result = post.find((element) => element.idUser === idUser.uid);
        expect(result.username).toBe('RosmeryNew');
        done();
      };
      models.posts.postsMain(callback);
    }));
});
describe('DeletePost', () => {
  it('Deberia de poder eliminar un post', (done) => models.posts.deletePost('FCwyOleS2ooEYZrGpue3')
    .then(() => {
      const callback = (commentss) => {
        const result = commentss.find((element) => element.id === 'FCwyOleS2ooEYZrGpue3');
        expect(result).toBeUndefined();
        done();
      };
      models.posts.postsMain(callback);
    }));
});
