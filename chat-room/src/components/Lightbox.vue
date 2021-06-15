<template>
  <div v-if="visible"
       class="lightbox">
    <div class="lightbox-layer" />
    <div class="lightbox-card">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Lightbox',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.lightbox {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  &-layer {
    position: absolute;
    background-color: rgba(0,0,0,0.9)
  }
  &-card {
    background: white;
    width: auto;
    height: auto;
    border-radius: 0.25rem;
    overflow: hidden;
  }
}
.lightbox, .lightbox-layer {
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.lightbox, .lightbox-card {
  z-index: 10;
}
</style>