const profile = document.querySelector('.profile');
const editProfile = document.querySelector('.popup_type_edit');
const addCard = document.querySelector('.popup_type_new-card');
const popup = document.querySelectorAll('.popup');

const editForm = document.forms["edit-profile"];




function openPopup(elem) {
  const nameForm = editForm.elements.name;
  const descriptionForm = editForm.elements.description;

  nameForm.value = profile.querySelector('.profile__title').textContent;
  descriptionForm.value = profile.querySelector('.profile__description').textContent;
  
  elem.classList.add('popup_is-opened');

}

function closePopup (elem) {
  elem.classList.remove('popup_is-opened')
}

profile.addEventListener('click', event => {
  if (event.target.classList.contains('profile__edit-button')) {
    openPopup(editProfile)
  } else if (event.target.classList.contains('profile__add-button')) {
    openPopup(addCard)
  } 
})

popup.forEach(elem => {
  elem.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closePopup(elem)
    }
  })
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { 
      closePopup(elem)
    }
  })
})

export{ openPopup, closePopup }