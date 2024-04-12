const profile = document.querySelector('.profile');
const titleName = profile.querySelector('.profile__title');
const descriptionTitle = profile.querySelector('.profile__description');
const editProfile = document.querySelector('.popup_type_edit');
const addCard = document.querySelector('.popup_type_new-card');
const popup = document.querySelectorAll('.popup');



const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const jobInput = editForm.elements.description;


function handleFormSubmit(evt) {
  evt.preventDefault();
  
  const newName = nameInput.value;
  const newJob = jobInput.value;

  titleName.textContent = newName;
  descriptionTitle.textContent = newJob;

  closeModal(editProfile)
}

//открытие картинки
function openImgModal(img) {
  const popupImage = document.querySelector('.popup__image');
  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = img.image;
  popupCaption.textContent = img.title;
  openModal(popupTypeImage)
}



function openModal(elem) {
  nameInput.value = titleName.textContent;
  jobInput.value = descriptionTitle.textContent;
  elem.classList.add('popup_is-opened');
}

function closeModal(elem) {
  elem.classList.remove('popup_is-opened')
}

profile.addEventListener('click', event => {
  if (event.target.classList.contains('profile__edit-button')) {
    openModal(editProfile)
  } else if (event.target.classList.contains('profile__add-button')) {
    openModal(addCard)
  } 
})

popup.forEach(elem => {
  elem.classList.add('popup_is-animated')
  elem.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closeModal(elem)
    }
  })
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { 
      closeModal(elem)
    }
  })
})



export{ openModal, closeModal, openImgModal, handleFormSubmit }