import { getRooms, postRoom, getDropdown } from '@/api/Rooms'

const state = {
  rooms: [],
  condition: {
    topic: '',
    name: '',
    page: 1,
    limit: 20
  },
  roomName: ''
}
const mutations = {
  SET_LIST(state, data) {
    state.rooms = data.map(el => {
      return {
        host: el.owner || '',
        name: el.clubName || '',
        topic: el.topic || '',
        id: el.id || ''
      }
    })
  },
  SET_ROOM_NAME(state, data) {
    state.roomName = data.clubName
  }
}
const actions = {
  getRooms: async ({ commit, state, dispatch }) => {
    try {
      const parameter = []
      if (state.condition.topic !== '') parameter.push({key: 'topic', value: state.condition.topic })
      if (state.condition.name !== '') parameter.push({key: 'clubName', value: state.condition.name })
      if (state.condition.page !== 1) parameter.push({key: 'page', value: state.condition.page })
      if (state.condition.limit !== 20) parameter.push({key: 'limit', value: state.condition.limit })
      const { data } = await getRooms(parameter)
      if (data) {
        commit('SET_ROOM_NAME', data.data)
      }
    } catch(e) {

    }
  },
  addRoom: async ({ commit, state, dispatch }, obj) => {
    try {
      const { data } = await postRoom(obj)
      if (data) {
        console.log(data, 'addRoom')
      }
    } catch(e) {
    }
  },
  getDropdown: async ({ commit, state, dispatch }) => {
    try {
      const { data } = await getDropdown()
      if (data) {
        console.log(data, 'code')
      }
    } catch(e) {
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}