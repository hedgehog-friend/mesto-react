import { useEffect, useState, useContext } from "react";
import pencil from "../../images/symbols_logo/pencil.svg";
import symbolAdd from "../../images/symbols_logo/symbolAdd.svg";
import api from "../../utils/Api.js";
import Card from "../Card/Card.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  // const [userInfo, setUserInfo] = useState({
  //   userName: "",
  //   userDescription: "",
  //   userAvatar: "",
  // });
  const [cards, setCards] = useState([]);
  useEffect(() => {
    //подгружаем данные пользователя с сервера

    // api.getUserData(),
    api
      .getInitialCards()
      .then((initialCards) => {
        //применяем данные пользователя
        // setUserInfo({
        //   userName: userData.name,
        //   userDescription: userData.about,
        //   userAvatar: userData.avatar,
        // });
        setCards(initialCards);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <main className="main">
      <section className="profile body__container">
        <div className="profile__data">
          <div className="profile__avatar">
            <img
              className="profile__image"
              src={currentUser.userAvatar}
              alt="аватар профиля"
            />
            <div className="profile__image-hover" onClick={props.onEditAvatar}>
              <img
                className="profile__image-hover-symbol"
                src={pencil}
                alt="symbol"
              />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__info-upper">
              <h1 className="profile__name">{currentUser.userName}</h1>
              <button
                className="profile__edit"
                aria-label="редактировать"
                type="button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__description">
              {currentUser.userDescription}
            </p>
          </div>
        </div>
        <button
          className="place-edit"
          aria-label="добавить место"
          type="button"
          onClick={props.onAddPlace}
        >
          <img
            className="place-edit__symbol-add"
            src={symbolAdd}
            alt="кнопка добавить место"
          />
        </button>
      </section>

      <section>
        <ul className="places body__container">
          {cards.map(function (item) {
            return (
              <Card
                card={item}
                key={item._id}
                onCardClick={props.onCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
