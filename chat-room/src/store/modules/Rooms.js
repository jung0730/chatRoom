import { getRooms, postRoom } from '@/api/Rooms'

const state = {
  rooms: [],
  condition: {
    topic: '',
    name: '',
    page: 1,
    limit: 20
  },
  createdRoom: {},
  total: 0
}
const RAW_STATE = { ...state }
const mutations = {
  RESET(state, resetData) {
    Object.keys(state).forEach(key => {
      state[key] = resetData[key]
    })
  },
  SET_LIST(state, data) {
    // todo
    const items = state.rooms = data.map(el => {
      return {
        host: el.owner?.nickname || '',
        hostId: el.owner?.id || '',
        clubId: el.owner?.clubId || '',
        number: el.population || 0,
        name: el.clubName || '',
        topic: el.topic || '',
        id: el.id || ''
      }
    })
    // state.total = 0
    state.rooms = [...state.rooms, ...items]
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
  },
  SET_PAGE(state, page) {
    state.condition.page = page
  }
}
const actions = {
  reset({ commit }) { commit('RESET', RAW_STATE) },
  setKeyword: ({ commit }, val) => { commit('SET_KEYWORD', val) },
  setPage: async ({ commit }, page) => { commit('SET_PAGE', page) },
  getRooms: async ({ commit, state, dispatch }) => {
    try {
      const parameter = []
      if (state.condition.topic !== '') parameter.push({key: 'topic', value: state.condition.topic })
      if (state.condition.name !== '') parameter.push({key: 'clubName', value: state.condition.name })
      if (state.condition.page !== 1) parameter.push({key: 'page', value: state.condition.page })
      if (state.condition.limit !== 20) parameter.push({key: 'limit', value: state.condition.limit })
      const { data } = await getRooms(parameter)
      if (data) {
        // todo
        commit('SET_LIST', data.data)
      } else {
        throw new error('error')
      }
    } catch(e) {
      throw e.response.data.error.message
    }
  },
  addRoom: async ({ commit, state, dispatch }, obj) => {
    try {
      const { data }  = await postRoom(obj)
      if (data) {
        commit('SET_ROOM_NAME', data.data)
      } else {
        throw new error('error')
      }
    } catch(e) {
      throw e.response.data.error.message
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}