<template>
  <div class="kana-game">
    <h1 class="game-title">Kitsune Sensei</h1>

    <div class="game-board">
      <div class="kana-question">Match the romaji: {{ current.romaji }}</div>

      <div class="kana-grid">
        <div
          class="kana-tile"
          v-for="(option, index) in current.options"
          :key="index"
          @click="handleSelection(option)"
        >
          {{ option.character }}
        </div>
      </div>
      <img class="teacher-image"
      src="@/assets/fox-placeholder.png"
      alt="fox character"
    />
    <div v-if="feedback" :class="['feedback', feedbackClass]">
        {{ feedback }}
      </div>
    </div>


  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
import { getRandomKana, checkKanaAnswer } from "../gameLogic";
import fox from "../assets/fox-placeholder.png";

// Define types
type KanaOption = {
  romaji: string;
  character: string;
};

// Reactive state
const current = ref(getRandomKana());
const feedback = ref("");


// Handle selection logic
function handleSelection(selected: KanaOption) {
  const isCorrect = checkKanaAnswer(selected.character, current.value.character);
  feedback.value = isCorrect ? "Correct!" : "Try again!";
  setTimeout(() => {
    current.value = getRandomKana();
    feedback.value = "";
  }, 2500);
}

// Feedback class for styling
const feedbackClass = computed(() => {
  return feedback.value === "Correct!" ? "correct" : "incorrect";
});
</script>

<style scoped src="./KanaGame.css"></style>
