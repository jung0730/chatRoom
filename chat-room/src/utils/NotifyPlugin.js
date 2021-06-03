import Vue from 'vue'
import Notify from '@/components/Notify'

const notify = function(title = '', options = {}) {
  const instanceData = Object.assign({}, {})
  const instance = (() => {
    const NotifyConstructor = Vue.extend(Notify)
    const node = document.createElement('div')
    document.querySelector('body').appendChild(node)

    const Vm = new NotifyConstructor({
      data: instanceData
    })

    return Vm.$mount(node)
  })()

  return instance.handleNotify()
}

const install = function(Vue, options) {
  Object.defineProperties(Vue.prototype, {
    $notify: {
      get() {
        return notify
      }
    }
  })
}

const NotifyPlugin = {
  install
}
export default NotifyPlugin