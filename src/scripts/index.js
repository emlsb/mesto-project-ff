import '../pages/index.css';
// import { initialCards } from './cards.js';
import { openModal, closeModal, closePopupByOverlay, closePopupByEsc } from './modal.js';
import { createCard, removeCard, likeCardBtn } from './card.js';
import { enableValidation, clearValidation, validationConfig } from './validation.js';


// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const addCardForm = document.forms["new-place"];
const titleInput = addCardForm.elements["place-name"];
const linkInput = addCardForm.elements.link;
const popup = document.querySelectorAll('.popup');
const editProfile = document.querySelector('.popup_type_edit');

const profile = document.querySelector('.profile');
const titleName = profile.querySelector('.profile__title');
const descriptionTitle = profile.querySelector('.profile__description');

const addCardPopup = document.querySelector('.popup_type_new-card');


const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;

// Получение профиля 
fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
  method: 'GET',
  headers: {
    authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3'
  }
})
  .then(res => res.json())
  .then((data) => {
    titleName.textContent = data.name;
    descriptionTitle.textContent = data.about;
  });


// Редактирование формы
function handleEditFormSubmit() {
  fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    titleName.textContent = data.name;
    descriptionTitle.textContent = data.about;
    closeModal(editProfile);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
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

//Получение карточек
fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
  method: 'GET',
  headers: {
    authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3'
  }
})
  .then(res => res.json())
  .then((data) => {
    data.forEach(elem => {
      const card = createCard(({image: elem.link, title: elem.name}), removeCard, likeCardBtn, openImgModal)
      cardsContainer.append(card);
    });
  }); 


// Функция добавления карточки
function addCard() {

  fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
    method: 'POST',
    headers: {
      authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: titleInput.value,
      link: linkInput.value
    })
  })
  .then(response => {
    return response.json();
  })
  .then(data => {
    const card = createCard(data, removeCard, likeCardBtn, openImgModal);
    cardsContainer.prepend(card);
    titleInput.value = '';
    linkInput.value = '';
    closeModal(addCardPopup);
  })
  .catch(error => {
    console.error('Ошибка:', error);
  });
}



// Вывод карточек на страницу
// initialCards.forEach(elem => {
//   const card = createCard(({image: elem.link, title: elem.name}), removeCard, likeCardBtn, openImgModal)
//   cardsContainer.append(card);
// });

// Слушатель кнопок для открытия попапа
profile.addEventListener('click', event => {
  if (event.target.classList.contains('profile__edit-button')) {
    nameInput.value = titleName.textContent;
    jobInput.value = descriptionTitle.textContent;
    openModal(editProfile)
    clearValidation(editForm, validationConfig)
  } 

  else if (event.target.classList.contains('profile__add-button')) {
    titleInput.value = '';
    linkInput.value = ''
    openModal(addCardPopup)
    clearValidation(addCardPopup, validationConfig)
  } 
})

// Слушатель для закрытия через esc или overlay
popup.forEach(elem => {
  elem.classList.add('popup_is-animated')
  elem.addEventListener('click', evt => {
    closePopupByOverlay(evt)
  })
  closePopupByEsc(elem)
})

editForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', addCard);
enableValidation(validationConfig);





export {addCardForm, addCardPopup, cardTemplate,
        titleName, descriptionTitle, nameInput, 
        jobInput}