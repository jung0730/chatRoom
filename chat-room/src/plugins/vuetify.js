import Vue from 'vue'
import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0da0d8',
        primaryDark: '#097bbd',
        primaryLight: '#25a9db',
        secondary: '#fdf460',
        secondaryMedium: '#ffd402',
        secondaryDark: '#efba05',
        gray: '#f5f5f5',
        white: '#ffffff'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
