<template>
  <Lightbox :visible="visible">
    <div class="custom-card">
      <div class="custom-card-title">
        Error
      </div>
      <div class="custom-card-message">
        {{ errorMessage }}
      </div>
      <div class="custom-card-action">
        <button @click="closeDialog">
          OK
        </button>
      </div>
    </div>
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
      this.$nextTick(this.$destroy)
    }
  }
}
</script>
<style lang="scss" scoped>
$primary: #0da0d8;
$primaryLight: #25a9db;
$primaryDark: #097bbd;
$white: #ffffff;
.custom-card {
  width: 25rem;
  text-align: center;
  &-title {
    font-weight: bold;
    font-size: 2rem;
    padding: 0.5rem;
  }
  &-message {
    color: $primaryDark;
    margin-bottom: 1rem;
  }
  &-action {
    background-color: $primary;
    color: $white;
    button {
      width: 100%;
      height: 100%;
      outline: none;
      font-size: 1.2rem;
      padding: 0.5rem;
      &:hover {
        background-color: $primaryLight;
      }
    }
  }
}
</style>