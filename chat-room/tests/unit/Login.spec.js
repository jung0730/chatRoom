import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login.vue'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('Login.vue', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Login, {
      localVue,
      vuetify
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('', () => {
    const input = wrapper.find('[data-test="input"]')
    input.element.value = 'rebecca'
    input.trigger('keyup.enter')
  })
})
