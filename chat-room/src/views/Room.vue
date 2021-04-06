<template>
  <v-container fluid
               class="room-container">
    <v-container class="chat-container">
      <div class="message-area">
        <v-row>
          <v-col cols="6">
            <div class="left-dialog-box">
              <v-avatar color="secondaryDark"
                        size="56"
                        class="mr-4">
                Xiang
              </v-avatar>
              <p class="left-dialog-message">
                Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
                "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."
              </p>
            </div>
          </v-col>
          <v-col cols="6" 
                 offset="6">
            <div class="right-dialog-box">
              <p class="right-dialog-message">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </v-col>
          <v-col v-for="(item, idx) in messages"
                 :key="idx"
                 cols="12">
            <div class="right-dialog-box">
              <p class="right-dialog-message">
                {{ item }}
              </p>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-row class="send-area">
        <v-text-field v-model="message"
                    class="send-area"
                    background-color="white"
                    hide-details
                    height="100"
                    placeholder="Enter messages..."
                    @keyup.enter.native="sendHandler">
        </v-text-field>
      </v-row>
    </v-container>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      messages: [],
      message: ''
    }
  },
  updated() {
  },
  methods: {
    sendHandler() {
      this.messages.push(this.message)
      this.message = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.room-container {
  height: 100%;
  background: #f5f5f5;
}
.chat-container {
  max-width: 64rem;
  height: 100%;
  background: #097BBD;
  opacity: 0.8;
  border-radius: 1rem;
  position: relative;
}
.message-area {
  overflow: hidden;
  height: calc(100vh - 190px);
}
.left-dialog {
  &-box {
    display: flex;
    align-items: baseline;
  }
  &-message {
    background-color: white;
    color: #573D01;
    border-radius: 1rem;
    padding: 0.5rem;
    &::before {
      content: '';
      width: 0; 
      height: 0; 
      border-top: 1rem solid white;
      border-left: 1rem solid transparent;
      position: absolute;
      left: 72px;
    }
  }
}
.right-dialog {
  &-box {
    display: flex;
    justify-content: flex-end;
  }
  &-message {
    background-color: white;
    color: #573D01;
    border-radius: 1rem;
    padding: 0.5rem;
    &::after {
      content: '';
      width: 0; 
      height: 0; 
      border-top: 1rem solid white;
      border-right: 1rem solid transparent;
      position: absolute;
      right: 0
    }
  }
}
</style>