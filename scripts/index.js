// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const cardList = document.querySelector('.places__list')

// @todo: Функция создания карточки
initialCards.forEach(function(elem) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = elem.link
  cardElement.querySelector('.card__title').textContent = elem.name
  cardList.append(cardElement)
})


// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
