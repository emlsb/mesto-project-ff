import { cardTemplate, iconDelete, deletePopup, delBtn } from ".";
import { deleteCard } from "./api";
import { closeModal, openModal } from "./modal";

// Функция создания карточки
function createCard (cardData, onDelete, onLike, openImgModal, currentUserId) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDelButton = cardElement.querySelector('.card__delete-button');
  const likeBtn = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeCount = cardElement.querySelector('.like_card_count');
  
  cardElement.querySelector('.card__title').textContent = cardData.title;
  cardImage.alt = cardData.title;
  cardImage.src = cardData.image;
  likeCount.textContent = cardData.likes.length;

  if (cardData.owner._id === currentUserId) {
    cardDelButton.addEventListener('click', () => {
      openModal(deletePopup)
      delBtn.addEventListener('click', () => {
        onDelete(cardElement, cardData._id);
        closeModal(deletePopup)
      })
    });
  } else {
    cardDelButton.style.display = 'none';
  }
  likeBtn.addEventListener('click', onLike);
  cardImage.addEventListener('click', () => {
    openImgModal(cardData)
  })

  return cardElement
};


// Функция удаления карточки
function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.error(`Не удалось удалить карточку: ${err}`);
    });
}

function openDeletePopup(evt) {
  evt.target
}


// Кнопка лайка
function likeCardBtn(event) {
  event.target.classList.toggle('card__like-button_is-active');
}



export {createCard, removeCard, likeCardBtn}
