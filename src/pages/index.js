//вебпак
import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {
  avatarForm,
  avatarSubmitButton,
  profileName,
  profileJob,
  profileAvatar,
  editProfileButton,
  editPopup,
  editForm,
  editSubmitButton,
  addCardButton,
  addPopup,
  addForm,
  addSubmitButton,
  figPopup,
  deletePopup,
  validationConfig,
  places,
  avatarProfileButton,
  avatarPopup,
  statusText,
  cardContainer
} from '../utils/constants.js';

//экземпляры валидации
const addFormValidator = new FormValidator(validationConfig, addForm);
const editFormValidator = new FormValidator(validationConfig, editForm);
const avatarFormValidator = new FormValidator(validationConfig, avatarForm);

//api
const api = new Api({
  serverURL: 'https://nomoreparties.co',
  cohortId: 'cohort-69',
  authorization: '1ec8d091-3f9c-421d-a4a7-065f3f46f4b2'
});

Promise.all([api.getUserData(), api.getCardInfo()])
  .then(([userData, cardData]) => {
    profileInfo.setUserInfo(userData);
    const initCardSection = new Section({
      items: cardData,
      renderer: (item) => {
        initCardSection.addItemAppend(createCard(item, profileInfo.userID()))
      }
    }, places);
    initCardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

//статус выполнения на кнопке
function changeButtonText(button, text) {
  button.textContent = text;
}

//КАРТОЧКИ
function createCard(element, userId) {
  const card = new Card(
    element,
    '.card-template',
    userId,
    handleCardClick,
    deleteCardPopup,
    {
      handleLikeCard: (likeButton, cardId) => {
        if (likeButton.classList.contains('place__like-button_active')) {
          return api.deleteLike(cardId)
            .then((res) => {
              card.likeCard(res.likes)
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return api.addLike(cardId)
            .then((res) => {
              card.likeCard(res.likes)
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }

  );
  const cardElement = card.createCard();
  return cardElement;
}

const newCardSection = new Section({
  items: [],
  renderer: (item) => newCardSection.addItemAppend(createCard(item, id))
}, places);

addCardButton.addEventListener('click', function () {
  addFormValidator.resetValidation();
  addFormValidator.disabledButton(addSubmitButton);
  newCardPopup.open();
});

//попап создания карточки
const newCardPopup = new PopupWithForm(
  addPopup,
  {
    handleFormSubmit: (formData) => {
      changeButtonText(addSubmitButton, statusText.cardWait);
      api.addCard({
        name: formData.placeTitle,
        link: formData.placeImg
      })
        .then((data) => {
          newCardSection.addItemPrepend(createCard(data, profileInfo.userID()))
          newCardPopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          changeButtonText(addSubmitButton, statusText.cardDefault);
        });
    }
  }
);

//попап удаления карточки
const deleteCardPopup = new PopupWithConfirmation(
  deletePopup,
  {
    confirmFunction: (card, cardId) => {
      api.deleteCard(cardId)
        .then(() => {
          // cardContainer.replaceChildren();
          // sortCards();
          card.deleteCard()
          deleteCardPopup.close();
        });
    }
  }
);

//попап с картинкой
const imgPopup = new PopupWithImage(figPopup)

function handleCardClick(name, link) {
  imgPopup.open(name, link);
}

//ПРОФИЛЬ
const profileInfo = new UserInfo({
  name: profileName,
  job: profileJob,
  avatar: profileAvatar
});

//попап профиля
const profileInfoPopup = new PopupWithForm(
  editPopup,
  {
    handleFormSubmit: (data) => {
      changeButtonText(editSubmitButton, statusText.profileWait);
      api.updateUserInfo({
        name: data.userName,
        about: data.userJob
      })
        .then((data) => {
          profileInfo.setUserInfo(data);
          profileInfoPopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          changeButtonText(editSubmitButton, statusText.profileDefault);
        });
    }
  }
);

editProfileButton.addEventListener('click', function () {
  editFormValidator.resetValidation();
  profileInfoPopup.setInputValues(profileInfo.getUserInfo());
  editFormValidator.activeButton(editSubmitButton);
  profileInfoPopup.open();
});

const profileAvatarPopup = new PopupWithForm(
  avatarPopup,
  {
    handleFormSubmit: (data) => {
      changeButtonText(avatarSubmitButton, statusText.profileWait);
      api.updateUserAvatar({
        avatar: data.userAvatar
      })
        .then((data) => {
          profileInfo.setUserInfo(data);
          profileAvatarPopup.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          changeButtonText(avatarSubmitButton, statusText.profileDefault);
        });
    }
  }
);
avatarProfileButton.addEventListener('click', function () {
  avatarFormValidator.resetValidation();
  avatarFormValidator.disabledButton(avatarSubmitButton);
  profileAvatarPopup.open();
});

//вызов методов
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addFormValidator.enableValidation();
newCardPopup.setEventListeners();
profileInfoPopup.setEventListeners();
profileAvatarPopup.setEventListeners();
imgPopup.setEventListeners();
deleteCardPopup.setEventListeners();
newCardSection.renderItems();
