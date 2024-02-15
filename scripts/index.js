// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function addCard (image, title, delButton='') {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__title').textContent = title;

  cardList.append(cardElement)
}
initialCards.forEach(function(elem) {
  addCard(elem.link, elem.name)
})


// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
