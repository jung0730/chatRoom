<template>
  <div v-if="visible"
       class="lightbox-container">
    <div class="lightbox" />
    <div class="custom-card-container">
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
.lightbox-container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}
.lightbox {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.9)
}
.custom-card-container {
  background: white;
  width: auto;
  height: auto;
  z-index: 10;
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>