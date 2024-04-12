import '../pages/index.css';
import { initialCards } from './cards.js';
import { closeModal, openImgModal, handleFormSubmit } from './modal.js';
import { createCard, removeCard, likeCardBtn } from './card.js';
import { addCardForm, addCardPopup } from './card.js';


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const editForm = document.forms["edit-profile"];
const titleInput = addCardForm.elements["place-name"];
const linkInput = addCardForm.elements.link;


// Функция добавления карточки через кнопку
function addCard(evt) {
  evt.preventDefault();

  const card = createCard(({image: linkInput.value, title: titleInput.value}), removeCard, likeCardBtn, openImgModal)
  cardsContainer.prepend(card)
  titleInput.value = '';
  linkInput.value = '';

  closeModal(addCardPopup)
}




// Вывод карточек на страницу
initialCards.forEach(elem => {
  const card = createCard(({image: elem.link, title: elem.name}), removeCard, likeCardBtn, openImgModal)
  cardsContainer.append(card);
});


editForm.addEventListener('submit', handleFormSubmit)
addCardForm.addEventListener('submit', addCard)
