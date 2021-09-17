import { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import ImagePopup from "../ImagePopup/ImagePopup.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import api from "../../utils/Api.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "../EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    userId: "",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    // const item = {
    //   name: "Cow",
    //   link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    // };

    // api.createCard(item);
    // api.createCard(item);
    // api.createCard(item);
    // api.createCard(item);

    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        //применяем данные пользователя
        setCurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  function handleUpdateUser(userData) {
    api
      .updateUser(userData)
      .then((userData) => {
        setCurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });

        closeAllPopups();
        // userInfo.setUserInfo({
        //   newNameValue: user.name,
        //   newDescriptionValue: user.about,
        // });
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleUpdateavatar(userData) {
    api
      .updateAvatar(userData)
      .then((userData) => {
        setCurrentUser({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar,
          userId: userData._id,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleAddPlace(placeData) {
    api
      .createCard(placeData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser.userId);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App body">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          card={selectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        {/* <!-- Модальное окно для редактирования профиля --> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* <PopupWithForm
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
        </PopupWithForm> */}

        {/* <!-- Модальное окно для изменения аватара --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateavatar}
        />
        {/* <PopupWithForm
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
        </PopupWithForm> */}

        {/* <!-- Модальное окно для добавления места --> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        {/* <PopupWithForm
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
        </PopupWithForm> */}

        {/* <!-- Модальное окно для просмотра изображения --> */}
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
        ></PopupWithForm>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
