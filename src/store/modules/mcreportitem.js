const state = function() {
  return {
    content: []
  };
};

const mutations = {
  RECEIVE_REPORT_ITEM(state, { content }) {
    state.content = content;
  }
};

const actions = {
  async FETCH_REPORT_ITEM({ commit }, params) {
    commit('PENDING_ON', { label: 'Loading Report Item' }, { root: true }); // show spinner
    var myCognos = this.getters.myCognos;

    myCognos.then(function(cognos) {
      cognos.getReportData(params.id).then(function(data) {
        commit(
          params.id + '/RECEIVE_REPORT_ITEM',
          {
            content: data
          },
          { root: true }
        );
        commit('PENDING_OFF', {}, { root: true }); // hide spinner
      });
    });
  }
};

const getters = {
  content: state => {
    console.log('Getting Report Item Content', state.content);
    //  debugger;
    var result = [];
    if (typeof state.content.dataSet !== 'undefined') {
      result = state.content.dataSet.dataTable;
      console.log('Rows getter returns ', result);
    }
    return result;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
