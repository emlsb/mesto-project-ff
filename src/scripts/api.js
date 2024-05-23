const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
  headers: {
    authorization: '9d5d6fa7-0659-457b-9e89-3e8b259997b3',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
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