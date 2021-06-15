<template>
  <div class="editableDiv">
    <div class="file">
      <div v-for="(file, idx) in previewFiles"
           :key="idx"
           class="file-type">
        <img :src="file"
             class="file-img">
        <v-btn icon
               absolute
               class="file-btn"
               color="secondaryDark"
               @click="deleteImg(idx)">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
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
// ref: https://github.com/hl037/vue-contenteditable/blob/master/src/components/contenteditable.vue
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
    value(newVal, oldVal) {
      if( newVal !== this.$refs.contentEditable.textContent) {
        this.$refs.contentEditable.textContent = ''
      }
    }
  },
  methods: {
    deleteImg(idx) {
      this.previewFiles.splice(idx)
    },
    changeText() {
      this.$emit('input', this.$refs.contentEditable.textContent)
    },
    compressImg(img, size) {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const width = img.width
      const height = img.height
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)
      // 最小壓縮
      const data = canvas.toDataURL('image/jpeg', size)
      return data
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
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = (e) => {
            const image = new Image()
            image.src = reader.result
            image.onload = () => {
              let compressImg = ''
              if ((file.size / 1024 / 1024) > 4) {
                compressImg = this.compressImg(image, 0.1)
              } else if ((file.size / 1024 / 1024) > 3) {
                compressImg = this.compressImg(image, 0.3)
              } else if ((file.size / 1024 / 1024) > 2) {
                compressImg = this.compressImg(image, 0.4)
              } else {
                compressImg = this.compressImg(image, 0.5)
              }
              this.previewFiles.push(compressImg)
            }
          }
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
$primaryDark: #097BBD;
.editableDiv {
  border: 2px solid $primaryDark;
  border-radius: 0.5rem;
  padding: 0.5rem;
}
.message {
  width: 100%;
  height: 5rem;
  outline: none;
  white-space: pre-wrap;
  overflow-x: hidden;
  &:empty::before {
    content: attr(data-placeholder);
    color: gray;
  }
}
.file {
  display: flex;
  &-type {
    position: relative;
  }
  &-img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    margin-right: 0.5rem;
  }
  &-btn {
    top: -0.625rem;
    right: -0.625rem;
  }
}
</style>