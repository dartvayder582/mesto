//профиль
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const profileAvatar = document.querySelector('.profile__avatar');
export const editProfileButton = document.querySelector('.profile__edit-button');
export const editPopup = document.querySelector('.popup_type_edit');
export const avatarProfileButton = document.querySelector('.profile__avatar-button');
export const avatarPopup = document.querySelector('.popup_type_avatar');

//форма профиля
export const editForm = document.forms.editProfile;
export const editSubmitButton = editForm.querySelector('.form__submit-button');
export const avatarForm = document.forms.avatarProfile;
export const avatarSubmitButton = avatarForm.querySelector('.form__submit-button');

//карточки
export const cardContainer = document.querySelector('.places');
export const addCardButton = document.querySelector('.profile__add-button');
export const addPopup = document.querySelector('.popup_type_add');
export const deletePopup = document.querySelector('.popup_type_delete');

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

//статус ответа
export const statusText = {
  deleteDefault: 'Да',
  deleteWait: 'Удаление...',
  profileDefault: 'Сохранить',
  profileWait: 'Сохранение...',
  cardDefault: 'Создать',
  cardWait: 'Создание...',
  ready: 'Готово!',
}
