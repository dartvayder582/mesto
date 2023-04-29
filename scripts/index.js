let editProfileButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close-button');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__item_el_name');
let jobInput = formElement.querySelector('.form__item_el_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

function togglePopup() {
  popup.classList.toggle('popup_opened');
}

editProfileButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup();
});

closePopup.addEventListener('click', togglePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  profileName.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  togglePopup();
}

formElement.addEventListener('submit', handleFormSubmit);

