import Vue from 'vue'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Login from '@/views/Login'
import Notify from '@/utils/NotifyPlugin'
import axios from 'axios'
import store from '@/store/index'

Vue.use(Vuetify)
const localVue = createLocalVue()
localVue.use(Notify)
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
    const response = {
      data: {
        uid: 'test',
        nickname: 'rebecca'
      }
    }
    axios.post.mockImplementationOnce(() => (Promise.resolve({ data: response })))
    wrapper.find('[data-test="userName"]').setValue('rebecca')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="btn"]').attributes('disabled')).toBeFalsy()
    wrapper.find('[data-test="btn"]').trigger('click')
    await wrapper.vm.$nextTick()
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveReturnedTimes(1)
    expect(store.state.Environment.uid).toEqual('test')
    expect(store.state.Environment.nickname).toEqual('rebecca')
  })
})
