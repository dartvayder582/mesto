import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector('.form__submit-button');
  }

  setHandleSubmit(func) {
    this._confirmFunction = func;
    this._confirmButton.addEventListener('click', () => {
      this._confirmFunction();
    });
  }
}

