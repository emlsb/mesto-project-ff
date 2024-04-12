//Открытие попапа
function openModal(elem) {
  elem.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupByEsc);
}

//Закрытие попапа
function closeModal(elem) {
  elem.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByOverlay (evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closeModal(evt.currentTarget)
  }
}

const closePopupByEsc = function (e) {
  if (e.key === 'Escape') {
    const openElem = document.querySelector('.popup_is-opened')
    closeModal(openElem)
  }
}



export{ openModal, closeModal, closePopupByOverlay, closePopupByEsc }