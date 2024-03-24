const profile = document.querySelector('.profile');
const editProfile = document.querySelector('.popup_type_edit');
const addCard = document.querySelector('.popup_type_new-card');
const popup = document.querySelectorAll('.popup')



function openPopup() {
  profile.addEventListener('click', function(event){
    if (event.target.classList.contains('profile__edit-button')) {
      editProfile.classList.add('popup_is-opened')
    } else if (event.target.classList.contains('profile__add-button')) {
      addCard.classList.add('popup_is-opened')
    } 
  })
}

function closePopup () {
  popup.forEach(function(elem) {
    elem.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
        elem.classList.remove('popup_is-opened')
      }
    })
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { 
        elem.classList.remove('popup_is-opened')
      }
    })
  })
}

openPopup();
closePopup()

export{ openPopup, closePopup }