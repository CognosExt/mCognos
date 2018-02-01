import * as types from '../mutation-types';

import getCognos from 'jcognos';

var myCognos = '';

const state = {
  isLoggedIn: false,
  //  pending: false,
  myCognos: false
};

const mutations = {
  MY_COGNOS(state, { transfer }) {
    state.myCognos = transfer;
    console.log('transfer', transfer);
    console.log('My Cognos is set', state.myCognos);
    //    state.pending = true;
  },
  LOGIN_SUCCESS(state) {
    state.isLoggedIn = true;
    //    state.pending = false;
  },
  LOGOFF(state) {
    state.isLoggedIn = false;
  },
  LOGIN_ERROR(state) {}
};

const actions = {
  login({ commit }, creds) {
    commit('PENDING_ON', { label: 'Logging In' }, { root: true }); // show spinner

    console.log('login parameters are ', creds);

    myCognos = getCognos(creds.url, creds.debug);
    commit('MY_COGNOS', {
      transfer: myCognos
    });
    return myCognos.then(function(cognos) {
      return cognos
        .login(creds.username, creds.password)
        .then(function() {
          console.log('store logged in');

          // This feels like the wrong place to do this
          localStorage.setItem('cognosUser', creds.username);
          if (device.platform == 'Android' || device.platform == 'Mac OS X') {
            cordova.plugins.SecureKeyStore.set(
              function(res) {
                console.log(res); // res - string securely stored
                console.log('Password securely saved');
              },
              function(error) {
                console.log(error);
              },
              'cognosPassword',
              creds.password
            );
          } else {
            localStorage.setItem('cognosPassword', creds.password);
          }
          console.log('saved credentials');
          commit('LOGIN_SUCCESS');
          commit('PENDING_OFF', {}, { root: true }); // show spinner
        })
        .catch(function(err) {
          // This feels like the wrong place to do this
          if (device.platform == 'Android' || device.platform == 'Mac OS X') {
            cordova.plugins.SecureKeyStore.remove(
              function(res) {
                console.log(res); // res - string removed
              },
              function(error) {
                console.log(error);
              },
              'cognosPassword'
            );
          } else {
            localStorage.removeItem('cognosPassword');
          }
          console.log('Error logging in', err);

          commit(
            'SHOW_NOTIFICATION',
            { message: err, title: 'Login Error', type: 'error' },
            { root: true }
          );
          commit('PENDING_OFF', {}, { root: true }); // show spinner
        });
    });
  },
  logoff({ commit }) {
    commit('PENDING_ON', {}, { root: true }); // show spinner

    // This feels like the wrong place to do this
    localStorage.removeItem('user');

    return myCognos.then(function(cognos) {
      return cognos.logoff().then(function() {
        if (device.platform == 'Android' || device.platform == 'Mac OS X') {
          cordova.plugins.SecureKeyStore.remove(
            function(res) {
              console.log('Password removed from safe storage.'); // res - string removed
            },
            function(error) {
              console.log(error);
            },
            'cognosPassword'
          );
        } else {
          localStorage.removeItem('cognosPassword');
        }
        commit('PENDING_OFF', {}, { root: true }); // show spinner

        commit('LOGOFF');
      });
    });
  }
};

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  //  pending: state => state.pending,
  myCognos: state => state.myCognos //,
  /*pending: (state, something = null, rootState) =>
    (Boolean = function(state, something = null, rootState) {
      return rootState.pending;
    })*/
};

export default {
  state,
  getters,
  actions,
  mutations
};
