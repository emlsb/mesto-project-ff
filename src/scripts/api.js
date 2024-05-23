const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3',
    'Content-Type': 'application/json'
  }
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

const addNewCard = (nameCard, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      likes: [],
      name: nameCard,
      link: link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export {getInitialCards, getProfile, updateProfile, addNewCard}

// function addCard() {

//   fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
  //   method: 'POST',
  //   headers: {
  //     authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     likes: [],
  //     name: titleInput.value,
  //     link: linkInput.value
  //   })
  // })
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     const card = createCard(data, removeCard, likeCardBtn, openImgModal);
//     cardsContainer.prepend(card);
//     titleInput.value = '';
//     linkInput.value = '';
//     closeModal(addCardPopup);
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });
// }


// function handleEditFormSubmit() {
//   fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
//     method: 'PATCH',
//     headers: {
//       authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: nameInput.value,
//       about: jobInput.value
//     })
//   })
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     titleName.textContent = data.name;
//     descriptionTitle.textContent = data.about;
//     closeModal(editProfile);
//   })
//   .catch(error => {
//     console.error('Ошибка:', error);
//   });
// }


// Получение профиля 
// fetch('https://nomoreparties.co/v1/wff-cohort-13/users/me', {
//   method: 'GET',
//   headers: {
//     authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3'
//   }
// })
//   .then(res => res.json())
//   .then((data) => {
//     titleName.textContent = data.name;
//     descriptionTitle.textContent = data.about;
//   });

// //Получение карточек
// fetch('https://nomoreparties.co/v1/wff-cohort-13/cards', {
//   method: 'GET',
//   headers: {
//     authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3'
//   }
// })
//   .then(res => res.json())
//   .then((data) => {
//     data.forEach(elem => {
//       const card = createCard(({image: elem.link, title: elem.name, likes: elem.likes.length}), removeCard, likeCardBtn, openImgModal)
//       cardsContainer.append(card);
//     });
//     console.log(data)
//   }); 