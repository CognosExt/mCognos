import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getCognos from 'jcognos';

var myCognos;
This is to mess up this file

const state = {
  data: [],
  rows: [],
  //  loggedIn: function () {
  //    return myCognos.then(function (cognos) {
  //      return cognos.loggedIn;
  //    })
  //  },
  isLoggedIn: false,
  pending: false
}

const mutations = {
  RECEIVE_CHARACTERS(state, {
      characters
    }) {
      state.data = characters;
      state.pending = false;

    },
    RECEIVE_ROWS(state, {
      rows
    }) {
      state.rows = rows;
      state.pending = false;
    },
    FETCHING(state) {
      state.pending = true;
      console.log("Pending is True");
    },
    LOGIN(state) {
      state.pending = true;
    },
    LOGIN_SUCCESS(state) {
      state.isLoggedIn = true;
      state.pending = false;
    },
    LOGOFF(state) {
      state.isLoggedIn = false;
      state.pending = false;
    },
    LOGIN_ERROR(state) {
      state.pending = false;
    }
}

const actions = {
  async FETCH_CHARACTERS({
      commit
    }, params) {
      console.log("here are the types", params);
      commit('FETCHING'); // show spinner

      myCognos.then(function (cognos) {
        if (params.id == 0) {
          cognos.listRootFolder().then(function (data) {;
            commit('RECEIVE_CHARACTERS', {
              characters: data
            })
          })
        } else {
          cognos.listFolderById(params.id, '*', params.types).then(function (data) {;
            commit('RECEIVE_CHARACTERS', {
              characters: data
            })
          })
        }
      })
    },
    async FETCH_REPORT({
      commit
    }, params) {
      commit('FETCHING'); // show spinner
      console.log("here are the params for FETCH_REPORT", params);
      myCognos.then(function (cognos) {
        cognos.getReportData(params.id).then(function (data) {
          commit('RECEIVE_ROWS', {
            rows: data
          })
        })

      })
    },
    login({
      commit
    }, creds) {
      commit('LOGIN'); // show spinner

      console.log("login parameters are ", creds);

      myCognos = getCognos(creds.url, creds.debug);

      return myCognos.then(function (cognos) {
        return cognos.login(creds.username, creds.password)
          .then(function () {
            console.log("store logged in");

            // This feels like the wrong place to do this
            localStorage.setItem('cognosUser', creds.username);
            //localStorage.setItem('cognosPassword', creds.password);
/*            cordova.plugins.SecureKeyStore.set(function (res) {
              console.log(res); // res - string securely stored
              console.log('Password securely saved');
            }, function (error) {
              console.log(error);
            }, "cognosPassword", creds.password);*/
            console.log("saved credentials");
            commit('LOGIN_SUCCESS');

          })
          .catch(function (err) {
            // This feels like the wrong place to do this

/*            cordova.plugins.SecureKeyStore.remove(function (res) {
              console.log(res); // res - string removed
            }, function (error) {
              console.log(error);
            }, "cognosPassword");*/
            commit('LOGIN_ERROR');
          });
      });
    },
    logoff({
      commit
    }) {
      commit('FETCHING'); // show spinner
      // This feels like the wrong place to do this
      localStorage.removeItem('user');
      localStorage.removeItem('password');

      return myCognos.then(function (cognos) {
        return cognos.logoff()
          .then(function () {
        /*    cordova.plugins.SecureKeyStore.remove(function (res) {
              console.log('Password removed from safe storage.'); // res - string removed

            }, function (error) {
              console.log(error);
            }, "cognosPassword");*/

            commit('LOGOFF');
          })
      })
    }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  pending: state => state.pending,
  characters: state => {
    return state.data.map(data => {
      return {
        name: data.name,
        id: data.id,
        type: data.type,
        searchPath: data.searchPath

      }
    })
  },
  rows: state => {

    var result = [];

    if (typeof state.rows.dataSet !== 'undefined') {
      result = state.rows.dataSet.dataTable;
      console.log("Rows getter returns ", result);
    }
    return result;
  }

}

const store = new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters
})

export default store
