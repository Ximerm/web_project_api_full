import { useEffect, useRef, useState } from "react";
import FormValidator from "../../../../../../utils/FormValidator";

export default function NewCard({ title, onAddPlaceSubmit }) {
  const [nameCard, setNameCard] = useState("");
  const [link, setLink] = useState("");

  // Referencia al formulario
  const formRef = useRef(null);

  useEffect(() => {
    if (!formRef.current) return;

    const formValidator = new FormValidator(formRef.current, {
      formSelector: ".popup__form",
      inputSelector: ".popup__form-input",
      submitButtonSelector: ".popup__form-submit",
      inactiveButtonClass: "popup__form-submit_disable",
      inputErrorClass: "popup__form-input_type_error",
      errorClass: "input-error",
    });

    formValidator.enableValidation();
  }, []);

  const handleTitleChange = (e) => {
    setNameCard(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddPlaceSubmit({
      name: nameCard,
      link,
    });

    setNameCard("");
    setLink("");
  };

  return (
    <form
      ref={formRef}
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
        value={nameCard}
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
        value={link}
        onChange={handleLinkChange}
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
