import Vue from 'vue'
import Notify from '@/components/Notify'

const notify = function(errorMessage = '') {
  // create constructor
  const NotifyConstructor = Vue.extend(Notify)
  // create an instance
  const Vm = new NotifyConstructor({
    data: Object.assign({}, { errorMessage })
  })
  const node = document.createElement('div')
  document.querySelector('body').appendChild(node)
  // mount it on an element
  return Vm.$mount(node)
}

// attach it to Vue.prototype
const plugin = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $notify: {
      get() {
        return notify
      }
    }
  })
}

export default plugin