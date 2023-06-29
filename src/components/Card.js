export default class Card {
  constructor(data, templateSelector, userId, { handleCardClick }, { handleCardDelete }, { handleLikeCard }) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardTemplate;
  }

  _toggleDeleteButton() {
    if (this._cardOwnerId === this._userId) {
      this._deleteButton.classList.add('place__delete-button_active');
    } else {
      this._deleteButton.classList.remove('place__delete-button_active');
    }
    return this._deleteButton;
  }

  _toggleLikeButton() {
    this._likes.forEach((el) => {
      if (el._id === this._userId) {
        this._likeButton
          .classList
          .toggle('place__like-button_active');
      }
    })
  }

  likeCard(likes) {
    this._likeButton
      .classList
      .toggle('place__like-button_active');
    this._cardLikes.textContent = likes.length;
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this._likeButton);
    }
    );
    this._toggleDeleteButton().addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.place__image');
    this._cardName = this._element.querySelector('.place__name');
    this._likeButton = this._element.querySelector('.place__like-button');
    this._cardLikes = this._element.querySelector('.place__like-count');
    this._deleteButton = this._element.querySelector('.place__delete-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._cardLikes.textContent = this._likes.length;

    this._toggleLikeButton();
    this._setEventListeners();

    return this._element;
  }
}

