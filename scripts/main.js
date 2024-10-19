(async function() {
  const url = new URL('../assets/flashcards.json', window.location.origin)
  const flashcards = await loadCards(url.href)

  for (let flashcard of flashcards) {
    generateCard(
      flashcard.category,
      flashcard.question,
      flashcard.answer
    )
  }
})()

const cardContainer = document.getElementById('card-container')
const cardTemplate = document.getElementById('card-template')
  .content.querySelector('.card')

async function loadCards(file) {
  const flashcards = await fetch(file).then(res => res.json())
  return Object.values(flashcards)
}

function generateCard(category, question, answer) {
  const card = document.importNode(cardTemplate, true)
  const categoryTag = card.querySelector('.category-tag')
  const questionCard = card.querySelector('.question-card > p')
  const answerCard = card.querySelector('.answer-card > p')

  categoryTag.textContent = category
  questionCard.textContent = question
  answerCard.textContent = answer

  card.addEventListener('click', function() {
    this.classList.toggle('active')
  })

  cardContainer.appendChild(card)
}
