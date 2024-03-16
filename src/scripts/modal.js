function openPopup(event) {
  event.classList.add('popup_is-opened');
}

function closePopup (event) {
  event.classList.remove('popup_is-opened')
}

export{ openPopup, closePopup }