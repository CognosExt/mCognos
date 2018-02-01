import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as state from './state';
import * as getters from './getters';
import * as mutations from './mutations';
import login from './modules/login';
import folder from './modules/folder';
import mcreport from './modules/mcreport';
import mcreportitem from './modules/mcreportitem';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: state.state,
  actions: actions,
  getters: getters.getters,
  mutations: mutations.mutations,
  modules: {
    login,
    folder
  },
  strict: debug
});
