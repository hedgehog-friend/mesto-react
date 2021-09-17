import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

function AddPlacePopup(props) {
  const namePlaceRef = useRef();
  const linkPlaceRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      link: linkPlaceRef.current.value,
      name: namePlaceRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      buttonName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
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
          ref={namePlaceRef}
        />
        <span className="popup__input-error" id="name-place-error"></span>
        <input
          type="url"
          id="link"
          name="link"
          className="popup__form-item popup__form-item_el_description"
          placeholder="Ссылка на картинку"
          required
          ref={linkPlaceRef}
        />
        <span className="popup__input-error" id="link-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
