import '../pages/index.css';
import { getInitialCards, getProfile, updateProfile, addNewCard, changeAvatar } from './api.js';
import { openModal, closeModal, closePopupByOverlay } from './modal.js';
import { createCard, removeCard, likeCardBtn, confirmDelBtn, currentCardElement, currentCardId } from './card.js';
import { enableValidation, clearValidation, validationConfig } from './validation.js';
import { handleSubmit } from './utils.js';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

//Формы
const addCardForm = document.forms["new-place"];
const titleInput = addCardForm.elements["place-name"];
const linkInput = addCardForm.elements.link;

const newAvatarForm = document.forms["new-avatar"];
const linkAvatar = newAvatarForm.elements.link;

const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

const popups = document.querySelectorAll('.popup');
const editProfile = document.querySelector('.popup_type_edit');

const popupImage = document.querySelector('.popup__image');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');

const profile = document.querySelector('.profile');
const titleName = profile.querySelector('.profile__title');
const descriptionTitle = profile.querySelector('.profile__description');

const addCardPopup = document.querySelector('.popup_type_new-card');

const profileImage = profile.querySelector('.profile__image');
const editAvatarPopup = document.querySelector('.popup_type_new-avatar');

//Кнопки
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const delBtn = document.querySelector('.delete_btn');


//Вывод на страницу карточек и профиля
Promise.all([getProfile(), getInitialCards()])
  .then(([profileData, cards]) => {
    const currentUserId = profileData._id;

    // Обновление профиля
    console.log(cards)
    titleName.textContent = profileData.name;
    descriptionTitle.textContent = profileData.about;
    profileImage.src = profileData.avatar;

    // Создание карточек
    cards.forEach((cardData) => {
      const card = createCard({
        image: cardData.link,
        title: cardData.name,
        likes: cardData.likes,
        _id: cardData._id,
        owner: cardData.owner
      }, likeCardBtn, openImgModal, currentUserId);
      cardsContainer.append(card);
    });
  })
  .catch((error) => {
    console.error(error);
});



// Редактирование формы профиля
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Вызываем функцию обновления профиля на сервере
  function makeRequest () {
    return updateProfile(newName, newJob)
    .then((dataProfile) => {
      titleName.textContent = dataProfile.name;
      descriptionTitle.textContent = dataProfile.about;
      closeModal(editProfile);
    })
  }
  handleSubmit(makeRequest, evt)
}

// Функция для обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const newAvatarUrl = linkAvatar.value; 

  function makeRequest () {
    return changeAvatar(newAvatarUrl)
    .then((data) => {
      profileImage.src = data.avatar;
      closeModal(editAvatarPopup)
    })
  }
  handleSubmit(makeRequest, evt)
}

//Открытие картинки
function openImgModal(img) {
  popupImage.src = img.image;
  popupImage.alt = img.title
  popupCaption.textContent = img.title;
  openModal(popupTypeImage)
}

//Добаление карточки
function addCard(evt) {
  evt.preventDefault();

  const nameCard = titleInput.value;
  const link = linkInput.value;

  function makeRequest () {
    // Вызываем функцию добавления карточки на сервере
    return addNewCard(nameCard, link)
    .then((cardData) => {
      const card = createCard({ 
        image: cardData.link, 
        title: cardData.name, 
        likes: cardData.likes,
        _id: cardData._id,
        owner: cardData.owner
      }, likeCardBtn, openImgModal, cardData.owner._id); 
      cardsContainer.prepend(card);
      closeModal(addCardPopup);
    })
  }
  handleSubmit(makeRequest, evt)
}


// Слушатели
popups.forEach(elem => {
  elem.classList.add('popup_is-animated')
  elem.addEventListener('click', closePopupByOverlay)
})

profileImage.addEventListener('click', () => {
  newAvatarForm.reset()
  openModal(editAvatarPopup)
  clearValidation(newAvatarForm, validationConfig)
})

editButton.addEventListener('click', () => {
  nameInput.value = titleName.textContent;
  jobInput.value = descriptionTitle.textContent;
  openModal(editProfile)
  clearValidation(editForm, validationConfig)
})

addButton.addEventListener('click', () => {
  addCardForm.reset()
  openModal(addCardPopup)
  clearValidation(addCardForm, validationConfig)
})

confirmDelBtn.addEventListener('click', () => { 
  if ( currentCardElement && currentCardId) {  
    removeCard(currentCardElement[0], currentCardId[0]);
    currentCardElement.length = 0;
    currentCardId.length = 0;
    }
  }) 

newAvatarForm.addEventListener('submit', handleAvatarFormSubmit)
editForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', addCard);
enableValidation(validationConfig);