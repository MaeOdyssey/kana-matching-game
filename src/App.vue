<template>
  <div class="app">
    <!-- <h1>Kana Matching Game</h1> -->
    <KanaGame />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import KanaGame from './components/KanaGame.vue';

export default defineComponent({
  name: 'App',
  components: {
    KanaGame
  }
});
</script>

<style scoped>
.app {
  text-align: center;
  font-family: sans-serif;
}
</style>
