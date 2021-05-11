import { getRooms, postRoom } from '@/api/Rooms'

const state = {
  rooms: [],
  condition: {
    topic: '',
    name: '',
    page: 1,
    limit: 20
  }
}
const mutations = {
  SET_LIST(state, data) {
    state.rooms = data
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
        console.log(data, 'getRooms')
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}