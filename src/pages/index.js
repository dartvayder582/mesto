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

api.getUserData()
  .then((data) => {
    profileInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.log(err);
  });

function sortCards() {
  return api.getCardInfo()
    .then((cards) => {
      api.getUserData().then(data => sectionCard(cards.reverse(), data._id))
    })
    .catch((err) => {
      console.log(err);
    });
}

//статус выполнения на кнопке
function changeButtonText(button, text) {
  button.textContent = text;
}

//создание карточки
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

//создание секции
function sectionCard(elements, userId) {
  const section = new Section({
    items: elements,
    renderer: (item) => {
      section.addItem(createCard(item, userId))
    }
  }, places);
  section.renderItems();
}

//попап удаления карточки
const deleteCardPopup = new PopupWithConfirmation(
  deletePopup,
  {
    confirmFunction: (cardId) => {
      api.deleteCard(cardId)
        .then(() => {
          cardContainer.replaceChildren();
          sortCards();
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
        .then(() => {
          cardContainer.replaceChildren();
          sortCards();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          newCardPopup.close();
          changeButtonText(addSubmitButton, statusText.cardDefault);
        });
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
        .then(data => profileInfo.setUserInfo(data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          profileInfoPopup.close();
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
        .then(data => profileInfo.setUserInfo(data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          profileAvatarPopup.close();
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

//вызов методов и функций
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();
addFormValidator.enableValidation();
newCardPopup.setEventListeners();
profileInfoPopup.setEventListeners();
profileAvatarPopup.setEventListeners();
imgPopup.setEventListeners();
deleteCardPopup.setEventListeners();
sortCards();
