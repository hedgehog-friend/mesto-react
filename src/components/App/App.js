import { useState } from "react";
import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
// import Card from "../Card/Card.js";
// import api from "../../utils/Api.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  function handleCardClick(idCard) {
    setSelectedCard(idCard);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <div className="App body">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        card={selectedCard}
      />

      <Footer />

      {/* <!-- Модальное окно для редактирования профиля --> */}
      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        buttonName="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__input-container">
          <input
            type="text"
            id="name-profile"
            name="name-profile"
            className="popup__form-item popup__form-item_el_name"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="popup__input-error" id="name-profile-error"></span>
          <input
            type="text"
            id="description-profile"
            name="description-profile"
            className="popup__form-item popup__form-item_el_description"
            placeholder="Комментарий"
            minLength="2"
            maxLength="200"
            required
          />
          <span
            className="popup__input-error"
            id="description-profile-error"
          ></span>
        </fieldset>
      </PopupWithForm>

      {/* <!-- Модальное окно для изменения аватара --> */}
      <PopupWithForm
        name="avatar"
        title="Редактировать профиль"
        buttonName="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__input-container">
          <input
            type="url"
            id="avatar-link"
            name="link"
            className="popup__form-item popup__form-item_el_description"
            placeholder="Введите ссылку"
            required
          />
          <span className="popup__input-error" id="avatar-link-error"></span>
        </fieldset>
      </PopupWithForm>

      {/* <!-- Модальное окно для добавления места --> */}
      <PopupWithForm
        name="place"
        title="Новое место"
        buttonName="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__input-container">
          <input
            type="text"
            id="name-place"
            name="name-place"
            className="popup__form-item popup__form-item_el_name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__input-error" id="name-place-error"></span>
          <input
            type="url"
            id="link"
            name="link"
            className="popup__form-item popup__form-item_el_description"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error" id="link-error"></span>
        </fieldset>
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />

      {/* <!-- Модальное окно для подтверждения удаления --> */}
      <PopupWithForm
        name="confirm-deletion"
        title="Вы уверены?"
        buttonName="Да"
        isOpen={false}
      >
        {/* <div className="popup popup_type_confirm-deletion">
        <div className="popup__container popup__container-confirm-deletion">
          <button
            type="button"
            aria-label="закрыть"
            className="popup__exit popup__exit_location_confirm-deletion"
          ></button> */}
        {/* <h2 className="popup__title popup__title_type_confirmation">
          Вы уверены?
        </h2> */}
        {/* <button type="submit" className="popup__save">
            Да
          </button>
        </div>
      </div> */}
      </PopupWithForm>
    </div>
  );
}

export default App;
