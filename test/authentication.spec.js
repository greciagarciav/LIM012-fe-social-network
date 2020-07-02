// eslint-disable-next-line import/named
import { models } from '../src/model/model-index.js';
import '../__mock__/mock.js';

// TEST: REGISTRAR NUEVO USUARIO
describe('auth-signUp: Crear un usuario', () => {
  it('Deberia de registrarse con email prueba2@gmail.com y password prueba2', (done) => {
    models.authentication.signUp('prueba2@gmail.com', 'prueba2')
      .then((user) => {
        expect(user.email).toBe('prueba2@gmail.com');
        done();
      });
  });
});

// TEST: INICIAR SESION
describe('auth-signIn: Iniciar sesion', () => {
  it('Deberia poder iniciar sesion', (done) => {
    models.authentication.signIn('rguerra@gmail.com', 'guerra123')
      .then((user) => {
        expect(user.email).toBe('rguerra@gmail.com');
        expect(user.isAnonymous).toBe(false);
        done();
      });
  });
});

// TEST: INICIAR SESION CON GOOGLE
describe('auth-signInGoogle: Iniciar sesion con Google', () => {
  it('Deberia de iniciar sesion con Google', () => {
    models.authentication.signInGoogle()
      .then((user) => {
        expect(user.isAnonymous).toBe(false);
      });
  });
});

// TEST: INICIAR SESION CON FACEBOOK
describe('auth-signInFacebook: Iniciar sesion con Facebook', () => {
  it('Deberia de iniciar sesion con Facebook', () => {
    models.authentication.signInFacebook()
      .then((user) => {
        expect(user.isAnonymous).toBe(false);
      });
  });
});

// TEST: CERRAR SESION
describe('auth-signOut: Cerrar sesion', () => {
  it('Deberia de cerrar sesion', () => {
    models.authentication.signOut()
      .then((user) => {
        expect(user).toBe(null);
      });
  });
});
