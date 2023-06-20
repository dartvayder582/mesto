export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return cardTemplate;
  }

  _likeCard() {
    this._likeButton
      .classList
      .toggle('place__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    this._likeButton.addEventListener('click', () => this._likeCard());
    this._deleteButton.addEventListener('click', () => this._deleteCard());
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.place__image');
    this._cardName = this._element.querySelector('.place__name');
    this._likeButton = this._element.querySelector('.place__like-button');
    this._deleteButton = this._element.querySelector('.place__delete-button');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

