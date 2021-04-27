<template>
  <div class="outer-container">
    <div class="preview-files">
      <div v-for="(file, idx) in previewFiles"
           :key="idx">
        <img :src="file">
      </div>
    </div>
    <div ref="contentEditable"
         contenteditable="true"
         spellcheck="true"
         role="textbox"
         data-placeholder="Enter messages..."
         class="message"
         :value="value"
         @keydown.enter="captureEnterEvent"
         @input="changeText"
         @dragenter.stop.prevent="cancelDefault"
         @dragover.stop.prevent="cancelDefault"
         @drop.stop.prevent="drop" />
  </div>
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
  data() {
    return {
      previewFiles: []
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
        const files = [...this.previewFiles]
        this.$emit('enter', files)
        this.previewFiles.splice(0)
      }
    },
    drop(e) {
      e.dataTransfer.files.forEach(file => {
        if (file.type.includes('image')) {
          const objectURL = URL.createObjectURL(file)
          this.previewFiles.push(objectURL)
        }
      })
    },
    cancelDefault(e) {
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.outer-container {
  border: 2px solid #097BBD;
  border-radius: 0.5rem;
  padding: 0.5rem;
}
.message {
  width: 100%;
  height: 80px;
  outline: none;
  white-space: pre-line;
  overflow-wrap: break-word;
  display: inline-block;
  overflow-x: hidden;
}
.message:empty::before {
  content: attr(data-placeholder);
  color: gray;
}
.preview-files {
  display: flex;
}
img {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  margin-right: 0.5rem;
}
</style>