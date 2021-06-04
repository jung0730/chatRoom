<template>
  <Lightbox :visible="visible">
      <v-card width="500">
        <v-card-title class="justify-center">
          Error
        </v-card-title>
        <v-card-text class="text-center">
          {{ errorMessage }}
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
      errorMessage: ''
    }
  },
  methods: {
    closeDialog() {
      this.visible = false
    }
  }
}
</script>