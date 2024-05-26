import { checkResponse } from "./utils";


const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3',
    'Content-Type': 'application/json'
  }
}

function request(endpoint, options = {}) {
  const url = `${config.baseUrl}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}

function getInitialCards() {
  return request('/cards', {
    method: 'GET',
    headers: config.headers
  })
}

const getProfile = () => {
  return request('/users/me', {
    method: 'GET',
    headers: config.headers
  })
}

const updateProfile = (name, about) => {
  return request('/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

const addNewCard = (nameCard, link) => {
  return request('/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      likes: [],
      name: nameCard,
      link: link
    })
  })
}

const deleteCard = (cardId) => {
  return request(`/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
};

const onLike = (cardId, isLiked) => {
  return request(`/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  })
};

const changeAvatar = (avatar) => {
  return request('/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
}


export {getInitialCards, getProfile, updateProfile, addNewCard, deleteCard, onLike, changeAvatar, request}
