export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.addEventListener('mousedown', this._overlayClosePopup.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('mousedown', this._overlayClosePopup);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  _overlayClosePopup(e) {
    if (!e.target.closest('.popup__container')) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton = this._popup.querySelector('.popup__close-button');
    this._handleEscClose;
    this._closeButton.addEventListener('click', () => this.close());
  }
}
