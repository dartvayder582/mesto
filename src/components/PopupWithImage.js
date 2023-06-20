import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._img = this._popup.querySelector('.popup__figure-image');
    this._caption = this._popup.querySelector('.popup__figure-caption');
  }

  open(caption, img) {
    super.open();
    this._img.src = img;
    this._img.alt = caption;
    this._caption.textContent = caption;
  }
}
