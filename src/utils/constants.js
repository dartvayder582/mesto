//профиль
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const editPopup = document.querySelector('.popup_type_edit');

//форма профиля
export const editForm = document.forms.editProfile;
export const nameInput = editForm.elements.userName;
export const jobInput = editForm.elements.userJob;
export const editSubmitButton = editForm.querySelector('.form__submit-button');

//карточки
export const addCardButton = document.querySelector('.profile__add-button');
export const addPopup = document.querySelector('.popup_type_add');

//форма карточек
export const addForm = document.forms.addPlace;
export const addSubmitButton = addForm.querySelector('.form__submit-button');

//попап картинки
export const figPopup = document.querySelector('.popup_type_figure');

//валидация
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible',
};

//карточки
export const places = '.places';

const baikal = new URL('../images/baikal.jpg', import.meta.url);
const dombai = new URL('../images/dombai.png', import.meta.url);
const moscow = new URL('../images/moscow.jpg', import.meta.url);
const elbrus = new URL('../images/elbrus.png', import.meta.url);
const kchr = new URL('../images/kchr.jpg', import.meta.url);
const olkhon = new URL('../images/Olkhon-Island.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Озеро Байкал',
    link: baikal
  },
  {
    name: 'Домбай',
    link: dombai
  },
  {
    name: 'Москва',
    link: moscow
  },
  {
    name: 'Гора Эльбрус',
    link: elbrus
  },
  {
    name: 'Карачаево-Черкесия',
    link: kchr
  },
  {
    name: 'Остров Ольхон',
    link: olkhon
  }
];
