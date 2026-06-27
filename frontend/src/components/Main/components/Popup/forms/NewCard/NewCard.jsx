import { useEffect, useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import FormValidator from "../../../../../../utils/FormValidator";

export default function NewCard({ title, onAddPlaceSubmit }) {
  // Obtiene el objeto currentUser
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  // Agrega la variable de estado para name
  const [nameCard, setnameCard] = useState("");

  // Agrega la variable de estado para link
  const [link, setLink] = useState("");

  // Actualiza name cuando cambie la entrada
  const handleTitleChange = (event) => {
    setnameCard(event.target.value);
  };

  // Actualiza link cuando cambie la entrada
  const handlelinkChange = (event) => {
    setLink(event.target.value);
  };

  // Envío de formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Actualiza la información de la tarjeta
    onAddPlaceSubmit({ name: nameCard, link: link });
  };

  //Validar formulario
  useEffect(() => {
    const newCardForm = document.querySelector("#form-addCard");
    const formValidator = new FormValidator(newCardForm, {
      formSelector: ".popup__form",
      inputSelector: ".popup__form-input",
      submitButtonSelector: ".popup__form-submit",
      inactiveButtonClass: "popup__form-submit_disable",
      inputErrorClass: "popup__form-input_type_error",
      errorClass: "input-error",
    });
    formValidator.enableValidation();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      name="card-form"
      id="form-addCard"
    >
      {title && <h3 className="popup__form-title">{title}</h3>}
      <input
        className="popup__form-input"
        type="text"
        name="name"
        id="input-title"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required
        // Vincula name con la entrada
        value={nameCard}
        // Agrega el controlador onChange
        onChange={handleTitleChange}
      />
      <span className="input-error" id="input-title-error"></span>

      <input
        className="popup__form-input"
        type="url"
        name="link"
        id="input-link"
        placeholder="URL de la imagen"
        autoComplete="off"
        required
        // Vincula name con la entrada
        value={link}
        // Agrega el controlador onChange
        onChange={handlelinkChange}
      />
      <span className="input-error" id="input-link-error"></span>

      <button
        type="submit"
        className="popup__form-submit popup__form-submit_disable"
        id="submitBtn-card"
      >
        Crear
      </button>
    </form>
  );
}
