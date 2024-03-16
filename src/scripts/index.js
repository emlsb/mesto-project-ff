import { initialCards } from './cards.js';
import '../pages/index.css'
import { openPopup, closePopup } from './modal.js';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const editProfile = document.querySelector('.popup_type_edit');
const addCard = document.querySelector('.popup_type_new-card');




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

// @todo: Модальное окно
profile.addEventListener('click', function(event){
  if (event.target.classList.contains('profile__edit-button')) {
    openPopup(editProfile);
  } 
  else if (event.target.classList.contains('profile__add-button')) {
    openPopup(addCard)
  } 
})

document.addEventListener('click', function(event){
  if (event.target.classList.contains('popup__close')){
    if (editProfile.classList.contains('popup_is-opened')) {
      closePopup(editProfile);
    }
    else if (addCard.classList.contains('popup_is-opened')) {
      closePopup(addCard)
    }
  } 
})