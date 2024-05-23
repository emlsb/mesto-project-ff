import '../pages/index.css';
import { getInitialCards, getProfile, updateProfile } from './api.js';
import { initialCards } from './cards.js';
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


//Обнавляем информацию в профиле
getProfile()
  .then((dataProfile) => {
    titleName.textContent = dataProfile.name;
    descriptionTitle.textContent = dataProfile.about;
    console.log(dataProfile)
  })
  .catch((error) => {
    console.error(error);
  });


// Редактирование формы
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // Вызываем функцию обновления профиля на сервере
  updateProfile(newName, newJob)
    .then((dataProfile) => {
      // Обновляем данные на странице только после успешного обновления на сервере
      titleName.textContent = dataProfile.name;
      descriptionTitle.textContent = dataProfile.about;
      closeModal(editProfile);
    })
    .catch((error) => {
      console.error(error);
      // Обработка ошибки (например, показать сообщение пользователю)
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



// Функция добавления карточки
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


//Обработка ошибки из catch
getInitialCards()
  .then((result) => {
    // обрабатываем результат
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  });


editForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', addCard);
enableValidation(validationConfig);





export {addCardForm, addCardPopup, cardTemplate,
        titleName, descriptionTitle, nameInput, 
        jobInput}