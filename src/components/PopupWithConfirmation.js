import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { confirmFunction }) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.form__submit-button');
    this._confirmFunction = confirmFunction;
  }

  deleteConfirm(card, cardId) {
    this._confirmButton.addEventListener('click', () => this._confirmFunction(card, cardId));
  }
}
