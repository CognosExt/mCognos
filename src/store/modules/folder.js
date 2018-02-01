const state = {
  data: []
};

const mutations = {
  RECEIVE_FOLDERS(state, { folders }) {
    state.data = folders;
  }
};

const actions = {
  async FETCH_FOLDERS({ commit }, params) {
    var myCognos = this.getters.myCognos;
    commit('PENDING_ON', {}, { root: true }); // show spinner

    myCognos.then(function(cognos) {
      if (params.id == 0) {
        cognos.listRootFolder().then(function(data) {
          commit('RECEIVE_FOLDERS', {
            folders: data
          });
          commit('PENDING_OFF', {}, { root: true }); // show spinner
        });
      } else {
        cognos
          .listFolderById(params.id, '*', params.types)
          .then(function(data) {
            commit('RECEIVE_FOLDERS', {
              folders: data
            });
            commit('PENDING_OFF', {}, { root: true }); // hide spinner
          });
      }
    });
  }
};

const getters = {
  folders: state => {
    return state.data.map(data => {
      return {
        name: data.name,
        id: data.id,
        type: data.type,
        searchPath: data.searchPath
      };
    });
  },
  mcreports: state => {
    return state.data
      .filter(function(data) {
        return data.name.substring(0, 3) == 'mc_' && data.type == 'folder';
      })
      .map(function(data) {
        return {
          name: data.name.substring(data.name.indexOf('_') + 1),
          id: data.id,
          type: data.type,
          searchPath: data.searchPath
        };
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
