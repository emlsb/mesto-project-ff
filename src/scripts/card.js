import { deleteCard, onLike } from "./api";
import { closeModal, openModal } from "./modal";

const cardTemplate = document.querySelector('#card-template').content;
const deletePopup = document.querySelector('.popup_type_delete');
const confirmDelBtn = document.querySelector('.delete_btn');
const currentCardElement = [] ;
const currentCardId = [];

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
      currentCardElement.push(cardElement); 
      currentCardId.push(cardData._id); 
    }); 
  } else { 
    cardDelButton.style.display = 'none'; 
  } 
  if (cardData.likes.some(user => user._id === currentUserId)) { 
    likeBtn.classList.add('card__like-button_is-active'); 
  } 
  
  // confirmDelBtn.addEventListener('click', () => { 
  //   if (currentCardElement && currentCardId) { 
  //     onDelete(currentCardElement, currentCardId); 
  //     currentCardElement = null; 
  //     currentCardId = null; 
  //     } 
  //   }) 
  likeBtn.addEventListener('click', (event) => { 
    onLike(event.target, cardData._id, likeCount); 
  }); 
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
      closeModal(deletePopup)
    })
    .catch(err => {
      console.error(`Не удалось удалить карточку: ${err}`);
    });
}


// Кнопка лайка
function likeCardBtn(likeBtn, cardId, likeCountElement) {
  const isLiked = likeBtn.classList.contains('card__like-button_is-active');
  onLike(cardId, isLiked)
  .then((updatedCard) => {
    likeBtn.classList.toggle('card__like-button_is-active');
    likeCountElement.textContent = updatedCard.likes.length;
  })
  .catch(err => {
    console.error(`Не удалось оценить: ${err}`);
  });
}




export {createCard, removeCard, likeCardBtn, confirmDelBtn, currentCardElement, currentCardId}
