/* eslint-disable no-undef */
/* eslint-disable max-len */
import MockFirebase from 'mock-cloud-firestore';

import { models } from '../src/model/model-index.js';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        FCwyOleS2ooEYZrGpue3: {
          date: '26/6/2020 11:40:55',
          idUser: 'owe55NuhqjTJKIQQQ4Z98IavJ0i2',
          likes: [],
          photo: 'https://lh5.googleusercontent.com/-wKhdIQgHjwE/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnVyZrmN8eeqVDK3xOlucO70BjfoA/photo.jpg',
          post: 'hola',
          privacy: 'privacy',
          urlImg: '',
          username: 'Rosmery',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('uploadImage', () => {
  // const imagenAsubir = { files: ['estrella.jpg'] };

  // const file = { name: 'hola.png', type: 'image/png' };
  test('should return the path of the img file', () => models.posts.createPost('hola de test', 'owe55NuhqjTJKIQQQ4Z98IavJ0i2', '', 'Pepitoi', '', { files: ['estrella.jpg'] })
    .then((url) => expect(url).toBe('/PostsImages/estrella.jpg')));
});
// global.firebase = mockFirebase();
// const idUser = { uid: '02' };

// describe('pinta post pùblicos', () => {
//   it('Deberia guardar la creacion de una nueva publicacion', (done) => models.posts.createPost('hola de test', idUser, '', 'Pepitoi', '', imagenAsubir).then(() => {
//     const callback = (posts) => {
//       const result = posts.find((elem) => elem.post === 'hola de test');
//       // expect(data).toBe('hola de test')
//       expect(result.post).toBe('hola de test');
//       done();
//     };
//     models.posts.postsMain(callback);
//   }));
// });
const idUser = { uid: 'owe55NuhqjTJKIQQQ4Z98IavJ0i2' };

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

describe('editPost', () => {
  it('Deberia de poder eliminar un post', (done) => models.posts.editPost('FCwyOleS2ooEYZrGpue3', 'Nuevo post')
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
