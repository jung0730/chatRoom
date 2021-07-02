import Vue from 'vue'
import Vuetify from 'vuetify'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import EditableDiv from '@/components/EditableDiv'

Vue.use(Vuetify)
const localVue = createLocalVue()

describe('EditableDiv.vue', () => {
  let vuetify
  let wrapper
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = shallowMount(EditableDiv, {
      localVue,
      vuetify,
      propsData: {
        value: 'test'
      }
    })
  })
  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
  it('emits text and displays', async () => {
    wrapper.find('[data-test="editable"]').trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.find('[data-test="editable"]').attributes('value')).toBe('test')
  })
  it('emits image and previews', async () => {
    await wrapper.setData({
      previewFiles: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD']
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[data-test="img"]').isVisible()).toBe(true)
    wrapper.find('[data-test="editable"]').trigger('keydown.enter')
    expect(wrapper.emitted('enter')).toBeTruthy()
    expect(wrapper.vm.previewFiles).toStrictEqual([])
  })
})