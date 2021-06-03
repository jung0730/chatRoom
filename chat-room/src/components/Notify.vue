<template>
  <Lightbox :visible="visible">
      <v-card width="500">
        <v-card-title class="justify-center">
          Alert
        </v-card-title>
        <v-card-text class="text-center">
          error message blablabla
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary"
                 depressed
                 @click="closeDialog">
            OK
          </v-btn>
        </v-card-actions>
    </v-card>
  </Lightbox>
</template>
<script>
import Lightbox from '@/components/Lightbox'
export default {
  name: 'Notify',
  components: {
    Lightbox
  },
  data() {
    return {
      visible: true,
      handlePromise: null
    }
  },
  methods: {
    handleNotify() {
      this.visible = true
      return new Promise((resolve, reject) => {
        this.handlePromise = { resolve, reject }
      })
    },
    closeDialog() {
      this.visible = false
    }
  }
}
</script>