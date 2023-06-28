import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { confirmFunction }) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.confirm__button');
    this._confirmFunction = confirmFunction;
  }

  deleteConfirm(cardId) {
    this._confirmButton.addEventListener('click', () => this._confirmFunction(cardId));
  }
}
