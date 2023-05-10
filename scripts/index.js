//карточки при загрузке страницы
const initialCards = [
  {
    name: 'Озеро Байкал',
    link: './images/baikal.jpg'
  },
  {
    name: 'Домбай',
    link: './images/dombai.png'
  },
  {
    name: 'Москва',
    link: './images/moscow.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/elbrus.png'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/kchr.jpg'
  },
  {
    name: 'Остров Ольхон',
    link: './images/Olkhon-Island.jpg'
  }
];

//профиль
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const closeEditPopup = editPopup.querySelector('.popup__close-button');

//форма профиля
const editForm = document.forms.editProfile;
const nameInput = editForm.elements.userName;
const jobInput = editForm.elements.userJob;
const editSubmitButton = editForm.querySelector('.form__submit-button');

//карточки
const placeTitle = document.querySelector('.place__name');
const placeImg = document.querySelector('.place__image');
const addCardButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup_type_add');
const closeAddPopup = addPopup.querySelector('.popup__close-button');

//форма карточек
const addForm = document.forms.addPlace;
const titlePlaceInput = addForm.elements.placeTitle;
const imgPlaceInput = addForm.elements.placeImg;
const addSubmitButton = addForm.querySelector('.form__submit-button');

//попап картинки
const figPopup = document.querySelector('.popup_type_figure');
const closeFigPopup = figPopup.querySelector('.popup__close-button');
const figImg = figPopup.querySelector('.popup__figure-image');
const figCaption = figPopup.querySelector('.popup__figure-caption');

//создание карточки
const places = document.querySelector('.places');
const createCard = (cardInfo) => {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true);
  cardElement.querySelector('.place__name').textContent = cardInfo.name;
  const placeImg = cardElement.querySelector('.place__image');
  placeImg.src = cardInfo.link;
  placeImg.alt = cardInfo.name;
  const likeButton = cardElement.querySelector('.place__like-button');
  const deleteButton = cardElement.querySelector('.place__delete-button');

  const likeElement = () => {
    likeButton.classList.toggle('place__like-button_active');
  }
  const deleteElement = () => {
    cardElement.remove();
  }

  likeButton.addEventListener('click', likeElement);
  deleteButton.addEventListener('click', deleteElement);

  placeImg.addEventListener('click', function () {
    figImg.src = cardInfo.link;
    figCaption.textContent = cardInfo.name;
    openPopup(figPopup);
  });

  return cardElement;
}

initialCards.forEach(function (element) {
  places.prepend(createCard(element));
});

//Открытие и закрытие popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//сброс ошибок при открытии popup
function resetErrorMessage(form) {
  const inputElement = Array.from(form.querySelectorAll('.form__input'));
  const errorElement = Array.from(form.querySelectorAll('.form__error'));

  inputElement.forEach((item) => {
    item.classList.remove('form__input_type_error');
  });
  errorElement.forEach((item) => {
    item.classList.remove('form__error_visible');
    item.textContent = '';
  });
}

//edit
editProfileButton.addEventListener('click', function () {
  resetErrorMessage(editForm);
  editSubmitButton.disabled = false;
  editSubmitButton.classList.remove('form__submit-button_disabled');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

closeEditPopup.addEventListener('click', function () {
  closePopup(editPopup);
});

//add
addCardButton.addEventListener('click', function () {
  resetErrorMessage(addForm);
  addForm.reset();
  addSubmitButton.disabled = true;
  addSubmitButton.classList.add('form__submit-button_disabled');
  openPopup(addPopup);
});

closeAddPopup.addEventListener('click', function () {
  closePopup(addPopup);
});

//figure
closeFigPopup.addEventListener('click', function () {
  closePopup(figPopup);
});

//submit forms
function editFormSubmit() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
}

function addFormSubmit() {
  const addFormInput = {
    name: titlePlaceInput.value,
    link: imgPlaceInput.value,
  }
  places.prepend(createCard(addFormInput));
  closePopup(addPopup);
}

editForm.addEventListener('submit', editFormSubmit);
addForm.addEventListener('submit', addFormSubmit);
