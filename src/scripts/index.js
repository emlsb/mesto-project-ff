import { initialCards } from './cards.js';
import '../pages/index.css'
import { openModal, closeModal, openImgModal } from './modal.js';
import { createCard, removeCard, likeCardBtn } from './card.js';
// @todo: Темплейт карточки
// const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = document.forms["new-place"];
const nameInput = addCardForm.elements["place-name"];
const linkInput = addCardForm.elements.link;


function addCard(evt) {
  evt.preventDefault();

  const card = createCard(({image: linkInput.value, title: nameInput.value}), removeCard, likeCardBtn, openImgModal)
  cardsContainer.prepend(card)
  nameInput.value = '';
  linkInput.value = '';

  closeModal(addCardPopup)
}



// // @todo: Функция создания карточки
// function createCard (cardData, onDelete, onLike, openImgModal) {
//   const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
//   const cardDelButton = cardElement.querySelector('.card__delete-button');
//   const likeBtn = cardElement.querySelector('.card__like-button');
//   const cardImage = cardElement.querySelector('.card__image');
  
//   cardElement.querySelector('.card__title').textContent = cardData.title;
//   cardImage.alt = cardData.title;
//   cardImage.src = cardData.image;

//   cardDelButton.addEventListener('click', () => onDelete(cardElement));
//   likeBtn.addEventListener('click', onLike);
//   cardImage.addEventListener('click', () => {
//     openImgModal(cardData)
//   })


//   return cardElement
// };


// // @todo: Функция удаления карточки
// function removeCard(card) {
//   card.remove();
// }
// @todo: Вывести карточки на страницу
initialCards.forEach(elem => {
  const card = createCard(({image: elem.link, title: elem.name}), removeCard, likeCardBtn, openImgModal)
  cardsContainer.append(card);
});



addCardForm.addEventListener('submit', addCard)
