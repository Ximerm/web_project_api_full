import React, { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

import cardDelete from "../../../../images/Places/Trash_Vector.svg";
import cardLike from "../../../../images/Places/Like_Vector.svg";

export default function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const { name, link, likes } = props.card;

  const { handleOpenBigImage, onCardLike, onCardDelete } = props;

  const imageComponent = { name, link };

  // Verificar si el usuario actual dio like
  const isLiked = likes.some((like) => (like._id || like) === currentUser._id);

  // Controlador para like/dislike
  function handleLikeClick() {
    onCardLike();
  }

  // Controlador para eliminar tarjeta
  function handleDeleteClick() {
    onCardDelete();
  }

  return (
    <li className="card__content">
      <img
        className="card__photo-delete"
        src={cardDelete}
        alt="Ícono eliminar"
        onClick={handleDeleteClick}
      />

      <img
        className="card__photo"
        alt={name}
        src={link}
        onClick={() => handleOpenBigImage(imageComponent)}
      />

      <div className="card__info">
        <h2 className="card__photo-name">{name}</h2>

        <img
          className={`card__photo-like ${
            isLiked ? "card__photo-like_active" : ""
          }`}
          src={cardLike}
          alt="Ícono Me gusta"
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
