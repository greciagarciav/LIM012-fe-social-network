// configurando firebase mock
// eslint-disable-next-line import/no-extraneous-dependencies
import firebasemock from 'firebase-mock';
// const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();

mockauth.autoFlush();
mockfirestore.autoFlush();
// mockstorage.autoFlush();

const mockAnswer = {
  ref: {
    getDownloadURL: () => Promise.resolve('/PostsImages/estrella.jpg'),
  },
};

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

global.firebase.storage = () => ({
  ref: () => ({
    child: () => ({ put: () => Promise.resolve(mockAnswer) }),
  }),
});
