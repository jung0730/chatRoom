<template>
  <div contenteditable="true"
       spellcheck="true"
       role="textbox"
       data-placeholder="Enter messages..."
       class="message-container"
       :value="innerText"
       @input="changeText" />
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      innerText: this.value
    }
  },
  methods: {
    changeText() {
      this.innerText = this.$el.innerHTML
      this.$emit('input', this.innerText)
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
}
.message-container:empty::before {
  content: attr(data-placeholder);
  color: gray;
}
</style>