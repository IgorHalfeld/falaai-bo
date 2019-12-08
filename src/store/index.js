import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const modes = {
  legend: 'LEGEND',
  alertDetail: 'ALERT_DETAIL',
  shipDetail: 'SHIP_DETAIL',
};

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: {
      mode: 'LEGEND',
      currentShip: {},
      alerts: [],
    },
    actions: {
      setCurrentShip({ commit }, payload) {
        commit('SET_CURRENT_SHIP', payload);
      },
      setMode({ commit }, payload) {
        commit('SET_MODE', payload);
      },
      setAlerts({ commit }, payload) {
        commit('SET_ALERTS', payload);
      },
    },
    mutations: {
      SET_CURRENT_SHIP: (state, payload) => {
        state.currentShip = payload;
      },
      SET_ALERTS: (state, payload) => {
        state.alerts = payload;
      },
      SET_MODE: (state, payload) => {
        state.mode = payload;
      },
    },
  });

  return Store;
}
