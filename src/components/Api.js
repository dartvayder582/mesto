export default class Api {
  constructor({ serverURL, cohortId, authorization }) {
    this._serverURL = serverURL;
    this._cohortId = cohortId;
    this._authorization = authorization;
  }

  //проверка ответа
  _checkRes(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //загрузка карточек с сервера
  getCardInfo() {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))
  }

  //загрузка пользователя
  getUserData() {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))
  }

  //обновление инфмормации о пользователе
  updateUserInfo({ name, about }) {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkRes(res))
  }

  //обновление аватара пользователя
  updateUserAvatar({ avatar }) {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._checkRes(res))
  }

  //лайк карточки
  addLike(cardId) {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))
  }

  //снятие лайка
  deleteLike(cardId) {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))
  }

  addCard({ name, link }) {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkRes(res))
  }

  deleteCard(cardId) {
    return fetch(`${this._serverURL}/v1/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization
      }
    })
      .then(res => this._checkRes(res))
  }
}

