import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Rooms from '@/views/Rooms'
import Notify from '@/utils/NotifyPlugin'
import axios from 'axios'
import store from '@/store/index'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Notify)
document.body.setAttribute('data-app', true)
jest.mock('axios')

describe('Rooms.vue', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Rooms, {
      localVue,
      vuetify,
      store
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('sets data and displays', async () => {
    store.state.Rooms.rooms = [
      {
        host: 'beca',
        number: 7,
        name: 'learn english',
        topic: 'language',
      }
    ]
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="title"]').text()).toContain('learn english')
    expect(wrapper.find('[data-test="subtitle"]').text()).toEqual('language')
    expect(wrapper.find('[data-test="text"]').text()).toContain('beca')
  })
  it('creates a room', async () => {
    const response = {
      data: {
        clubName: 'test',
        topic: 'chitchat'
      }
    }
    axios.post.mockImplementationOnce(() => (Promise.resolve({ data: response })))
    await wrapper.setData({
      roomName: 'test',
      topicName: 'chitchat',
      isShowDialog: true
    })
    wrapper.find('[data-test="createBtn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(axios.post).toHaveBeenCalled()
    expect(axios.post).toHaveReturned()
    expect(store.state.Rooms.createdRoom.name).toEqual('test')
    expect(store.state.Rooms.createdRoom.topic).toEqual('chitchat')
  })
})