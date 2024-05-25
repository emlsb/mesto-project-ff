import '../pages/index.css';
import { getInitialCards, getProfile, updateProfile, addNewCard, changeAvatar } from './api.js';
import { openModal, closeModal, closePopupByOverlay, closePopupByEsc } from './modal.js';
import { createCard, removeCard, likeCardBtn } from './card.js';
import { enableValidation, clearValidation, validationConfig } from './validation.js';
import { data } from 'autoprefixer';

// @todo: DOM узлы
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const addCardForm = document.forms["new-place"];
const titleInput = addCardForm.elements["place-name"];
const linkInput = addCardForm.elements.link;
const popup = document.querySelectorAll('.popup');
const editProfile = document.querySelector('.popup_type_edit');
const deletePopup = document.querySelector('.popup_type_delete');
const delBtn = document.querySelector('.delete_btn');

const profile = document.querySelector('.profile');
const titleName = profile.querySelector('.profile__title');
const descriptionTitle = profile.querySelector('.profile__description');

const addCardPopup = document.querySelector('.popup_type_new-card');

const newAvatarForm = document.forms["new-avatar"];
const linkAvatar = newAvatarForm.elements.link;
const profileImage = profile.querySelector('.profile__image');
const editAvatarPopup = document.querySelector('.popup_type_new-avatar');

const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;



//Вывод на страницу карточек и профиля
Promise.all([getProfile(), getInitialCards()])
  .then(([profileData, cards]) => {
    const currentUserId = profileData._id;

    // Обновление профиля
    console.log(profileData)
    titleName.textContent = profileData.name;
    descriptionTitle.textContent = profileData.about;
    profileImage.src = profileData.avatar;

    // Создание карточек
    console.log(cards)
    cards.forEach((cardData) => {
      const card = createCard({
        image: cardData.link,
        title: cardData.name,
        likes: cardData.likes,
        _id: cardData._id,
        owner: cardData.owner
      }, removeCard, likeCardBtn, openImgModal, currentUserId);

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
  updateProfile(newName, newJob)
    .then((dataProfile) => {
      titleName.textContent = dataProfile.name;
      descriptionTitle.textContent = dataProfile.about;
      closeModal(editProfile);
    })
    .catch((error) => {
      console.error(error);
    });
}

// Функция для обновления аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const newAvatarUrl = linkAvatar.value; 

  changeAvatar(newAvatarUrl)
    .then((data) => {
      profileImage.src = data.avatar;
      closeModal(editAvatarPopup)
    })
    .catch((error) => {
      console.error('Ошибка при изменении аватара:', error);
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

//Добаление карточки
function addCard(evt) {
  evt.preventDefault();

  const nameCard = titleInput.value;
  const link = linkInput.value;

  // Получение данных профиля пользователя
  getProfile()
    .then(profileData => {
      const currentUserId = profileData._id;

      // Вызываем функцию добавления карточки на сервере
      addNewCard(nameCard, link)
        .then((cardData) => {
          const card = createCard({ 
            image: cardData.link, 
            title: cardData.name, 
            likes: cardData.likes,
            _id: cardData._id,
            owner: cardData.owner
          }, removeCard, likeCardBtn, openImgModal, currentUserId);
          
          cardsContainer.prepend(card);
          titleInput.value = '';
          linkInput.value = '';
          closeModal(addCardPopup);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}



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

profileImage.addEventListener('click', () => {
  openModal(editAvatarPopup)
})

newAvatarForm.addEventListener('submit', handleAvatarFormSubmit)
editForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', addCard);
enableValidation(validationConfig);



export {addCardForm, addCardPopup, cardTemplate,
        titleName, descriptionTitle, nameInput, 
        jobInput, deletePopup, delBtn}