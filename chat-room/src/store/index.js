import Vue from 'vue'
import Vuex from 'vuex'
import Environment from './modules/Environment'
import Rooms from './modules/Rooms'
import Room from './modules/Room'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    initEnvironment: async ({ dispatch}) => {
      dispatch('Environment/init')
    }
  },
  modules: {
    Environment,
    Rooms,
    Room
  }
})
