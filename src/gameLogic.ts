// src/gameLogic.ts

// ✅ Unified name: renamed kanaMap → kanaData
export const kanaData = [
  { romaji: "a", character: "あ" },
  { romaji: "i", character: "い" },
  { romaji: "u", character: "う" },
  { romaji: "e", character: "え" },
  { romaji: "o", character: "お" },
  { romaji: "ka", character: "か" },
  { romaji: "ki", character: "き" },
  { romaji: "ku", character: "く" },
  { romaji: "ke", character: "け" },
  { romaji: "ko", character: "こ" }
]

// ✅ Returns a random kana item and shuffled options
export function getRandomKana() {
  const randomEntry = kanaData[Math.floor(Math.random() * kanaData.length)]
  const correctCharacter = randomEntry.character

  // Pick 3 incorrect options
  const incorrectOptions = kanaData
    .filter(k => k.character !== correctCharacter)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)

  // Combine correct + incorrect and shuffle
  const options = [...incorrectOptions, randomEntry].sort(() => 0.5 - Math.random())

  return {
    romaji: randomEntry.romaji,
    character: correctCharacter,
    options
  }
}

// ✅ Simple answer check
export function checkKanaAnswer(selected: string, correct: string): boolean {
  return selected === correct
}
