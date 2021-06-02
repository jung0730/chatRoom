import Vue from 'vue'
import Vuetify, {
  VContainer,
  VRow,
  VCol,
  VTextField,
  VBtn,
  VIcon,
  VDialog,
  VSelect,
  VCard,
  VCardTitle,
  VCardSubtitle,
  VCardText,
  VAvatar
} from 'vuetify/lib'
Vue.use(Vuetify, {
  components: {
    VContainer,
    VRow,
    VCol,
    VTextField,
    VBtn,
    VIcon,
    VDialog,
    VSelect,
    VCard,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VAvatar
  }
})

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0DA0D8',
        primaryDark: '#097BBD',
        secondary: '#fdf460',
        secondaryDark: '#EFBA05',
        accent: '#82B1FF',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        normal: '#573D01'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})
