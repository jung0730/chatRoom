import Vue from 'vue'
import Vuetify from 'vuetify'
import Login from '@/views/Login.vue'
import { createLocalVue , mount } from "@vue/test-utils"

describe('Login.vue', () => {
  const localVue = createLocalVue()
  let vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
  })
  const wrapper = mount(Login, {
    localVue,
    vuetify
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
