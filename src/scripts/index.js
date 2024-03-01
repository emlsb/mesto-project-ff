// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');


// @todo: Функция создания карточки
function createCard (cardData, onDelete) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.title;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.alt = cardData.title;
  cardImage.src = cardData.image;

  const cardDelButton = cardElement.querySelector('.card__delete-button');
  cardDelButton.addEventListener('click', () => onDelete(cardElement));

  return cardElement
};

// @todo: Функция удаления карточки
function removeCard(card) {
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(elem) {
  const card = createCard(({image: elem.link, title: elem.name}), removeCard)
  cardsContainer.append(card);
});

console.log('Hello, World!')