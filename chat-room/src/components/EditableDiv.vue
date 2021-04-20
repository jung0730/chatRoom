<template>
  <div ref="contentEditable"
       contenteditable="true"
       spellcheck="true"
       role="textbox"
       data-placeholder="Enter messages..."
       class="message-container"
       :value="value"
       @input="changeText" />
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
    }
  }
}
</script>
<style lang="scss" scoped>
.message-container {
  width: 100%;
  height: 100px;
  outline: none;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  border: 2px solid #097BBD;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: inline-block;
  overflow-y: scroll
}
.message-container:empty::before {
  content: attr(data-placeholder);
  color: gray;
}
</style>