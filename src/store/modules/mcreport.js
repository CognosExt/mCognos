const state = function() {
  return {
    data: [],
    reportitems: [],
    id: ''
  };
};

const mutations = {
  RECEIVE_CONTENT(state, { content, id }) {
    state.data = content;
    state.id = id;
  },
  RECEIVE_ITEM_ROWS(state, { reports, id }) {
    state.reports = reports;
  }
};

const actions = {
  async FETCH_CONTENT({ commit }, params) {
    var myCognos = this.getters.myCognos;
    commit('PENDING_ON', { label: 'Loading Report' }, { root: true }); // show spinner

    myCognos.then(function(cognos) {
      cognos.listFolderById(params.id, 'mc_*', 'report').then(function(data) {
        commit(
          params.id + '/RECEIVE_CONTENT',
          {
            content: data,
            id: params.id
          },
          { root: true }
        );
        commit('PENDING_OFF', {}, { root: true }); // hide spinner
      });
    });
  },
  async FETCH_REPORT_ITEM({ commit }, params) {
    commit('PENDING_ON', {}, { root: true }); // show spinner
    var myCognos = this.getters.myCognos;
    myCognos.then(function(cognos) {
      cognos.getReportData(params.id).then(function(data) {
        commit(
          params.id + '/RECEIVE_ITEM_ROWS',
          {
            reports: data,
            id: params.id
          },
          { root: true }
        );
        commit('PENDING_OFF', {}, { root: true }); // hide spinner
      });
    });
  }
};

const getters = {
  name: state => {
    return 'My Name';
  },
  labelid: state => {
    var label = false;
    if (state.data && state.data.length > 0) {
      label = state.data.filter(function(item) {
        if (item && item.name.substring(3, 8) == 'label') {
          return true;
        }
        return false;
      });
    }
    if (label) {
      return label[0].id;
    } else {
      return '';
    }
  },
  mcreportitems(state) {
    var result = state.data
      .filter(function(item) {
        return item.name.substring(3, 8) != 'label_';
      })
      .map(function(item) {
        return {
          name: item.name.substring(item.name.indexOf('_', 4) + 1),
          id: item.id,
          type: item.name.substring(3, item.name.indexOf('_', 4)),
          searchPath: item.searchPath
        };
      });

    return result;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
