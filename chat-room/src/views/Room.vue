<template>
  <v-container fluid
               class="room-container">
    <v-container class="chat-container">
      <v-row class="message-area">
        <v-col cols="6">
        </v-col>
        <v-col cols="6"
               style="text-align:end">
        </v-col>
      </v-row>
      <v-row class="send-area">
        <v-textarea solo
                    hide-details
                    class="send-area"
                    label="Enter messages...">
        </v-textarea>
      </v-row>
    </v-container>
  </v-container>
</template>
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
</style>