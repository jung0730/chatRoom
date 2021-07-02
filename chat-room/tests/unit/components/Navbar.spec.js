import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Navbar from '@/components/Navbar'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('Narbar.vue', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = shallowMount(Navbar, {
      localVue,
      vuetify
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('displays rooms layout', async () => {
    await wrapper.setProps({ page: 'list' })
    expect(wrapper.find('[data-test="navbar"]').classes('ml-auto')).toBe(true)
    expect(wrapper.find('[data-test="btn"]').exists()).toBe(true)
  })
  it('displays room layout', async () => {
    await wrapper.setProps({ page: 'room' })
    expect(wrapper.find('[data-test="navbar"]').classes('mr-auto')).toBe(true)
    expect(wrapper.find('[data-test="btn"]').exists()).toBe(false)
  })
})