import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  profileName,
  profileJob,
  editProfileButton,
  editPopup,
  editForm,
  nameInput,
  jobInput,
  editSubmitButton,
  addCardButton,
  addPopup,
  addForm,
  addSubmitButton,
  figPopup,
  validationConfig,
  places,
  initialCards
} from '../utils/constants.js';

//экземпляры валидации
const addFormValidator = new FormValidator(validationConfig, addForm);

const editFormValidator = new FormValidator(validationConfig, editForm);

//создание карточки
function createCard(element) {
  const card = new Card(element, '.card-template', handleCardClick);
  const cardElement = card.createCard();
  return cardElement;
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => cardList.addItem(createCard(item))
}, places);

//попап с картинкой
const imgPopup = new PopupWithImage(figPopup)

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

//попап создания карточки
const newCardPopup = new PopupWithForm(
  addPopup,
  {
    handleFormSubmit: (formData) => {
      const info = {
        name: formData.placeTitle,
        link: formData.placeImg
      }
      cardList.addItem(createCard(info));
    }
  }
);

addCardButton.addEventListener('click', function () {
  addFormValidator.resetValidation();
  addFormValidator.disabledButton(addSubmitButton);
  newCardPopup.open();
});

//экземпляр профиля
const profileInfo = new UserInfo({
  name: profileName,
  job: profileJob
});

//попап профиля
const profilePopup = new PopupWithForm(
  editPopup,
  {
    handleFormSubmit: (data) => {
      const info = {
        name: data.userName,
        job: data.userJob
      }
      profileInfo.setUserInfo(info);
    }
  }
);

editProfileButton.addEventListener('click', function () {
  editFormValidator.resetValidation();
  nameInput.value = profileInfo.getUserInfo().name;
  jobInput.value = profileInfo.getUserInfo().job;
  editFormValidator.activeButton(editSubmitButton);
  profilePopup.open();
});

//вызов методов
editFormValidator.enableValidation();
cardList.renderItems();
addFormValidator.enableValidation();
newCardPopup.setEventListeners();
profilePopup.setEventListeners();
imgPopup.setEventListeners();
