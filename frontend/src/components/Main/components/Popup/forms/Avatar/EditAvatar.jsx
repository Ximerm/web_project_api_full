import { useRef } from "react";

export default function EditAvatar({ title, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      id="form-avatar"
      onSubmit={handleSubmit}
      noValidate
    >
      {title && <h3 className="popup__form-title">{title}</h3>}
      <input
        type="url"
        className="popup__form-input"
        id="input-avatar-url"
        name="avatar"
        placeholder="URL de la imagen"
        required
        ref={avatarRef}
      />
      <span className="input-error input-avatar-error"></span>
      <button type="submit" className="popup__form-submit">
        Guardar
      </button>
    </form>
  );
}
