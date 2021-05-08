import Vue from 'vue'
import Vuex from 'vuex'
import Environment from './modules/Environment'
import Rooms from './modules/Rooms'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Environment,
    Rooms
  }
})
