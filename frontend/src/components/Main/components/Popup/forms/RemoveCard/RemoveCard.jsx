import React from "react";

export default function RemoveCard({ onConfirm }) {
  function handleSubmit(event) {
    event.preventDefault();
    onConfirm();
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form popup__form_height_low"
      id="form-deleteCard"
    >
      <h2 className="popup__form-title popup__form-title_small_padding">
        ¿Estás seguro?
      </h2>
      <button
        type="submit"
        className="popup__form-submit popup__form-submit_margin_none"
        id="submitDelete-card"
      >
        Sí
      </button>
    </form>
  );
}
