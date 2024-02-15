// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard (image, title) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = title;
  cardImage.src = image;
  cardImage.alt = title

  cardList.append(cardElement)
};

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach(function(elem) {
  addCard(elem.link, elem.name)
});