import { figPopup, openPopup } from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._element
      .querySelector('.place__like-button')
      .classList
      .toggle('place__like-button_active');
  }
  _deleteCard() {
    this._element.remove();
  }

  _handleOpenPopup() {
    const figImg = figPopup.querySelector('.popup__figure-image');
    const figCaption = figPopup.querySelector('.popup__figure-caption');
    figImg.src = this._link;
    figImg.alt = this._name;
    figCaption.textContent = this._name;
    openPopup(figPopup);
  }

  _setEventListeners() {
    this._element
      .querySelector('.place__image')
      .addEventListener('click', () => { this._handleOpenPopup() });

    this._element
      .querySelector('.place__like-button')
      .addEventListener('click', () => {
        this._likeCard();
      });

    this._element
      .querySelector('.place__delete-button')
      .addEventListener('click', () => {
        this._deleteCard();
      });
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__image').alt = this._name;
    this._element.querySelector('.place__name').textContent = this._name;

    return this._element;
  }
}

