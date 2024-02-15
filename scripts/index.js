// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.places__item card').cloneNode(true);
// @todo: DOM узлы

// @todo: Функция создания карточки
function addCard (image, description) {
  cardElement.querySelector('.card__image') = image;
  cardElement.querySelector('.card__title').textContent = description;
}
// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
