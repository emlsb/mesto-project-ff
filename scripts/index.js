// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard (image, title, delButton) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDelButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = title;
  cardImage.src = image;
  cardImage.alt = title;

  cardDelButton.addEventListener('click', delButton);
  cardList.append(cardElement);
};

// @todo: Функция удаления карточки
function removeButton(evt) {
  evt.target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function(elem) {
  addCard(elem.link, elem.name, removeButton)
});