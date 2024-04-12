import { cardTemplate, titleInput, linkInput, cardsContainer, addCardPopup } from ".";
import { openModal, closeModal } from "./modal";

// Функция создания карточки
function createCard (cardData, onDelete, onLike, openImgModal) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDelButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = cardData.title;
  cardImage.alt = cardData.title;
  cardImage.src = cardData.image;

  cardDelButton.addEventListener('click', () => onDelete(cardElement));
  likeBtn.addEventListener('click', onLike);
  cardImage.addEventListener('click', () => {
    openImgModal(cardData)
  })

  return cardElement
};


// Функция удаления карточки
function removeCard(card) {
  card.remove();
}

// Кнопка лайка
function likeCardBtn(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

//Открытие картинки
function openImgModal(img) {
  const popupImage = document.querySelector('.popup__image');
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = img.image;
  popupImage.alt = img.title
  popupCaption.textContent = img.title;
  openModal(popupTypeImage)
}

// Функция добавления карточки через кнопку
function addCard(evt) {
  evt.preventDefault();

  const card = createCard(({image: linkInput.value, title: titleInput.value}), removeCard, likeCardBtn, openImgModal)
  cardsContainer.prepend(card)
  titleInput.value = '';
  linkInput.value = '';

  closeModal(addCardPopup)
}

export {createCard, removeCard, likeCardBtn, openImgModal, addCard}
