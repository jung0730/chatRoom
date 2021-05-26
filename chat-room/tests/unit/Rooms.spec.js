import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Rooms from '@/views/Rooms'
import store from '@/store/index'

Vue.use(Vuetify)
const localVue = createLocalVue()

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
})