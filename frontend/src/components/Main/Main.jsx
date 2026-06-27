import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import updateAvatar from "../../images/Profile/Update_Avatar_Icon.svg";
import editButton from "../../images/Profile/Edit_Button.svg";
import addButton from "../../images/Profile/Add_Button.svg";
import Popup from "./components/Popup/Popup";

import NewCard from "./components/Popup/forms/NewCard/NewCard";
import EditProfile from "./components/Popup/forms/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/forms/Avatar/EditAvatar";
import Card from "./components/Card/Card";
import ImagePopup from "./components/Popup/forms/ImagePopup/ImagePopup";
import RemoveCard from "./components/Popup/forms/RemoveCard/RemoveCard";

export default function Main({ onOpenPopup, onClosePopup, popup, cards }) {
  //Obtener el valor de currentUser
  const {
    currentUser,
    handleUpdateUser,
    handleUpdateAvatar,
    handleCardLike,
    handleCardDelete,
    handleAddPlaceSubmit,
  } = useContext(CurrentUserContext);

  //Variable para que seleccione ImagePopup con la card seleccionada
  const [selectedCard, setSelectedCard] = useState(null);

  // Variable para tarjeta seleccionada para eliminar
  const [cardToDelete, setCardToDelete] = useState(null);

  // Estado para manejar el estado de eliminación
  const [isDeleting, setIsDeleting] = useState(false);

  //Creación de variables que se pasarán como props en Popup.jsx
  const newCardPopup = {
    title: "Nuevo lugar",
    children: (
      <NewCard
        title={"Nuevo lugar"}
        onAddPlaceSubmit={(event) => handleAddPlaceSubmit(event)}
      />
    ),
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <EditProfile
        title={"Editar Perfil"}
        // Se coloca dos veces la función para que cuando renderice espere a que exista
        handleUpdateUser={(data) => {
          handleUpdateUser(data);
        }}
      />
    ),
  };

  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: (
      <EditAvatar
        title={"Cambiar foto de perfil"}
        // Se coloca dos veces la función para que cuando renderice espere a que exista
        onUpdateAvatar={(data) => {
          handleUpdateAvatar(data);
        }}
      />
    ),
  };

  const removeCardPopup = {
    title: "Eliminar tarjeta",
    children: (
      <RemoveCard
        onConfirm={handleDeleteConfirmation}
        isDeleting={isDeleting}
      />
    ),
  };

  // Función para cerrar el popup de imagen grande
  const handleCloseImagePopup = () => {
    setSelectedCard(null);
  };

  // Abrir el popup de confirmación de eliminar tarjeta
  const handleOpenRemoveCardPopup = (card) => {
    setCardToDelete(card);
    onOpenPopup(removeCardPopup);
  };

  // Función asincrónica para espera correcta de eliminación
  async function handleDeleteConfirmation() {
    if (!cardToDelete) return;
    setIsDeleting(true); // Activar estado de eliminación
    try {
      // Actualizar el estado inmediatamente
      const updatedCards = cards.filter(
        (card) => card._id !== cardToDelete._id,
      );
      setCardToDelete(null);
      onClosePopup();
      await handleCardDelete(cardToDelete._id); // Llamada a la API
      // Actualizar el estado de las tarjetas
      setCards(updatedCards);
    } catch (error) {
      console.error("Error eliminando tarjeta:", error);
    } finally {
      setIsDeleting(false); // Desactivar estado de eliminación
    }
  }

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Avatar"
          />
          <button
            className="profile__edit-avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          >
            <img src={updateAvatar} alt="Botón para editar Avatar" />
          </button>
        </div>

        <div className="profile__content">
          <div className="profile__info">
            <p className="profile__name">{currentUser.name}</p>
            <p className="profile__hobbie">{currentUser.about}</p>
          </div>
          <button
            aria-label="Add card"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img
              className="profile__edit-button-img"
              src={editButton}
              alt="Botón para editar perfil"
            />
          </button>
        </div>
        <button
          className="profile__add-button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img
            className="profile__add-button-img"
            src={addButton}
            alt="Botón para agregar nueva imagen"
          />
        </button>
      </section>

      <section className="card">
        {/*Se agrega Card*/}
        <ul className="card__element">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenBigImage={() => {
                setSelectedCard(card);
              }}
              onCardLike={() => handleCardLike(card)}
              onCardDelete={() => handleOpenRemoveCardPopup(card)}
            />
          ))}
        </ul>
      </section>

      {/* Renderizar el ImagePopup si se selecciona una imagen */}
      {selectedCard && (
        <ImagePopup card={selectedCard} onClose={handleCloseImagePopup} />
      )}

      {/*renderización condicional cuando popup no es null*/}
      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
