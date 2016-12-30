import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';

Vue.use(Vuex);
Vue.use(VueResource);

const state = {
  // todo: sync with monaco model :|
  code: null,
  codeStepI: 0
};

const mutations = {
  UPDATE_CODE_I(state, { i }) {
    state.codeStepI = i;
  },
  UPDATE_CODE(state, { code }) {
    state.code = code;
  }
};

const actions = {
  analyzeCode: ({ commit }, code) => {
    Vue.http.get('/analyze', { params: { code } }).then((res) => {
      commit('UPDATE_CODE', {
        code: JSON.parse(res.body)
      });
      commit('UPDATE_CODE_I', { i: 0 });
    });
  },
  updateCodeStepI: ({ commit }, i) => {
    if (state.code && i < state.code.trace.length && i >= 0) {
      commit('UPDATE_CODE_I', { i });
    }
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});
