import { useState, useContext, useEffect, useRef } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import FormValidator from "../../../../../../utils/FormValidator";

export default function EditProfile({ title, handleUpdateUser }) {
  // Obtiene el objeto currentUser
  const { currentUser } = useContext(CurrentUserContext);

  // Referencia al formulario
  const formRef = useRef(null);

  // Variables de estado
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  // Actualiza el estado cuando cambia el usuario
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // Actualiza name cuando cambie la entrada
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // Actualiza description cuando cambie la entrada
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Envío de formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  // Validar formulario
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

  return (
    <form
      ref={formRef}
      className="popup__form"
      id="form-profile"
      noValidate
      onSubmit={handleSubmit}
    >
      {title && <h3 className="popup__form-title">{title}</h3>}

      <input
        className="popup__form-input"
        type="text"
        name="name"
        id="input-name"
        placeholder="Nombre"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className="input-error" id="input-name-error"></span>

      <input
        className="popup__form-input"
        type="text"
        name="about"
        id="input-about"
        placeholder="Acerca de mí"
        minLength="2"
        maxLength="200"
        autoComplete="off"
        required
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="input-error" id="input-about-error"></span>

      <button
        type="submit"
        className="popup__form-submit popup__form-submit_disable"
        id="submitBtn-profile"
      >
        Guardar
      </button>
    </form>
  );
}
