import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";
import FormValidator from "../../../../../../utils/FormValidator";

export default function EditProfile({ title, handleUpdateUser }) {
  // Obtiene el objeto currentUser
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  // Agrega la variable de estado para name
  const [name, setName] = useState(currentUser.name);

  // Agrega la variable de estado para about
  const [description, setDescription] = useState(currentUser.about);

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
    // Actualiza la información del usuario
    handleUpdateUser({ name, about: description });
  };

  //Validar formulario
  useEffect(() => {
    const profileForm = document.querySelector(".popup__form");
    const formValidator = new FormValidator(profileForm, {
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
        // Vincula name con la entrada
        value={name}
        // Agrega el controlador onChange
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
        // Vincula description con la entrada
        value={description}
        // Agrega el controlador onChange
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
