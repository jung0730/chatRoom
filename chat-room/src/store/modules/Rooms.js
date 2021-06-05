import { getRooms, postRoom } from '@/api/Rooms'

const state = {
  rooms: [],
  condition: {
    topic: '',
    name: '',
    page: 1,
    limit: 20
  },
  createdRoom: {}
}
const RAW_STATE = { ...state }
const mutations = {
  RESET(state, resetData) {
    Object.keys(state).forEach(key => {
      state[key] = resetData[key]
    })
  },
  SET_LIST(state, data) {
    state.rooms = data.map(el => {
      return {
        host: el.owner?.nickname || '',
        clubId: el.owner?.clubId || '',
        number: el.population || 0,
        name: el.clubName || '',
        topic: el.topic || '',
        id: el.id || ''
      }
    })
  },
  SET_ROOM_NAME(state, data) {
    state.createdRoom =  {
      id: data.id || '',
      name: data.clubName || '',
      topic: data.topic || '',
      host: data.owner || ''
    }
  },
  SET_KEYWORD(state, val) {
    state.condition.name = val
  }
}
const actions = {
  reset({ commit }) { commit('RESET', RAW_STATE) },
  setKeyword: ({ commit }, val) => { commit('SET_KEYWORD', val) },
  getRooms: async ({ commit, state, dispatch }) => {
    try {
      const parameter = []
      if (state.condition.topic !== '') parameter.push({key: 'topic', value: state.condition.topic })
      if (state.condition.name !== '') parameter.push({key: 'clubName', value: state.condition.name })
      if (state.condition.page !== 1) parameter.push({key: 'page', value: state.condition.page })
      if (state.condition.limit !== 20) parameter.push({key: 'limit', value: state.condition.limit })
      const { data } = await getRooms(parameter)
      if (data) {
        commit('SET_LIST', data.data)
      } else {
        throw new error('error')
      }
    } catch(e) {
      throw e
    }
  },
  addRoom: async ({ commit, state, dispatch }, obj) => {
    try {
      const { data } = await postRoom(obj)
      if (data) {
        commit('SET_ROOM_NAME', data.data)
      } else {
        throw new error('error')
      }
    } catch(e) {
      throw e
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}