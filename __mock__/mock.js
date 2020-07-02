// configurando firebase mock
// eslint-disable-next-line import/no-extraneous-dependencies
import firebasemock from 'firebase-mock';
// const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirebase();
const mockstorage = new firebasemock.MockStorage();

mockauth.autoFlush();
mockfirestore.autoFlush();
// mockstorage.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
  () => mockstorage,
);
