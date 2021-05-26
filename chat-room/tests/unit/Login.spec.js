import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login'
import axios from 'axios'
import store from '@/store/index'

Vue.use(Vuetify)
const localVue = createLocalVue()
jest.mock('axios')

describe('Login.vue', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Login, {
      localVue,
      vuetify,
      store
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('if the username is empty, the button will remain disabled', async () => {
    wrapper.find('[data-test="userName"]').setValue('')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="btn"]').attributes('disabled')).toBeTruthy()
  })
  it('if the username is not empty, click the button and call api', async () => {
    wrapper.find('[data-test="userName"]').setValue('rebecca')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="btn"]').attributes('disabled')).toBeFalsy()
    wrapper.find('[data-test="btn"]').trigger('click')
    axios.post.mockImplementationOnce(() => {
      Promise.resolve({
        data: {
          data: {
            uid: 'test',
            nickname: 'rebecca'
          }
        }
      })
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
  })
})
