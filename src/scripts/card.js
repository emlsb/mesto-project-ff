const cardTemplate = document.querySelector('#card-template').content;

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

function likeCardBtn(event) {
  event.target.classList.toggle('card__like-button_is-active');
}


export {createCard, removeCard, likeCardBtn}
