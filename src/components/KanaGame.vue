<template>
  <div class="game-wrapper">
    <div class="game-board">
      <!-- <h1 class="game-title">Kana Matching Game</h1> -->
      <p class="match-label">Match the romaji: <strong>{{ currentRomaji }}</strong></p>
      <div class="kana-grid">
        <button
          v-for="kana in kanaOptions"
          :key="kana.character"
          class="kana-tile"
          @click="handleAnswer(kana.character)"
        >
          {{ kana.character }}
        </button>
      </div>
    </div>
    <img class="fox-character" :src="foxImage" alt="Fox character" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRandomKana, kanaData } from '../gameLogic'
import foxImage from '../assets/fox-placeholder.png'

const currentRomaji = ref('')
const kanaOptions = ref<{ character: string; romaji: string }[]>([])

function generateNewChallenge() {
  const correct = getRandomKana()
  const distractors = []

  while (distractors.length < 3) {
    const candidate = getRandomKana()
    if (
      candidate.romaji !== correct.romaji &&
      !distractors.some(d => d.character === candidate.character)
    ) {
      distractors.push(candidate)
    }
  }

  const allOptions = [...distractors, correct]
  kanaOptions.value = allOptions.sort(() => Math.random() - 0.5)
  currentRomaji.value = correct.romaji
}

function handleAnswer(selectedChar: string) {
  const correctKana = kanaData.find(k => k.romaji === currentRomaji.value)
  if (selectedChar === correctKana?.character) {
    alert('✅ Correct!')
  } else {
    alert('❌ Try again!')
  }
  generateNewChallenge()
}

onMounted(() => {
  generateNewChallenge()
})
</script>

<style scoped>
.game-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1e1e1e;
  background-image: url('@/assets/classroom-bg.png');
  background-size: cover;
  background-position: center;
  padding: 2rem;
  position: relative;
}

.game-board {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.game-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.match-label {
  font-size: 1.2rem;
  color: #222;
  margin-bottom: 1.5rem;
}

.kana-grid {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.kana-tile {
  font-size: 2rem;
  padding: 1rem 1.5rem;
  border: 2px solid #0077ff;
  border-radius: 0.5rem;
  background-color: white;
  cursor: pointer;
  transition: transform 0.2s;
}

.kana-tile:hover {
  transform: scale(1.1);
  background-color: #eef6ff;
}

.fox-character {
  width: 120px;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
