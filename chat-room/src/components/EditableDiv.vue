<template>
  <div ref="contentEditable"
       contenteditable="true"
       spellcheck="true"
       role="textbox"
       data-placeholder="Enter messages..."
       class="message-container"
       :value="value"
       @keydown.enter="captureEnterEvent"
       @input="changeText"
       @dragenter.stop.prevent="cancelDefault"
       @dragover.stop.prevent="cancelDefault"
       @drop.stop.prevent="drop" />
</template>
<script>
// ref: https://github.com/Cobertos/vue-input-contenteditable/blob/master/src/input-contenteditable.vue
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value() {
      if (this.value !== this.$refs.contentEditable.innerText) {
        this.$refs.contentEditable.textContent = this.value
      }
    }
  },
  methods: {
    changeText() {
      this.$emit('input', this.$refs.contentEditable.textContent)
    },
    captureEnterEvent(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.$emit('enter')
      }
    },
    drop(e) {
      e.dataTransfer.files.forEach(file => {
        this.$emit('send-files', file)
      })
    },
    cancelDefault(e) {
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.message-container {
  width: 100%;
  height: 80px;
  outline: none;
  white-space: pre-line;
  overflow-wrap: break-word;
  border: 2px solid #097BBD;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: inline-block;
  overflow-x: hidden;
}
.message-container:empty::before {
  content: attr(data-placeholder);
  color: gray;
}
</style>