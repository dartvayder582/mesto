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
    figImg.alt = cardInfo.name;
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
  document.addEventListener('keydown', escClosePopup);
  popup.addEventListener('mousedown', overlayClosePopup);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', escClosePopup);
  popup.removeEventListener('mousedown', overlayClosePopup);
}

//оверлей
function overlayClosePopup(e) {
  if (!e.target.closest('.popup__container')) {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  }
}

//esc
function escClosePopup(e) {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_opened')
    closePopup(popup);
  }
}

//edit
editProfileButton.addEventListener('click', function () {
  hideInputError(editForm, nameInput);
  hideInputError(editForm, jobInput);
  disabledButton(editSubmitButton);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
});

closeEditPopup.addEventListener('click', function () {
  closePopup(editPopup);
});

//add
addCardButton.addEventListener('click', function () {
  hideInputError(addForm, titlePlaceInput);
  hideInputError(addForm, imgPlaceInput);
  addForm.reset();
  activeButton(addSubmitButton);
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

