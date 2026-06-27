import closeIcon from "../../../../../../images/Popup/Close_Icon.svg";

export default function ImagePopup(props) {
  const { card, onClose } = props;
  return (
    <section className="popup" id="popup-big-card">
      <div className="popup__big-card">
        <button
          className="popup__close popup__close_big-card"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-btn-image"
            src={closeIcon}
            alt="Icono cerrar imagen"
          />
        </button>
        <div className="popup__big-card-content">
          <img className="popup__image-card" alt={card.name} src={card.link} />
          <p className="popup__image-title">{card.name}</p>
        </div>
      </div>
    </section>
  );
}
