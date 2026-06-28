class Api {
  constructor(url) {
    this._url = url;
  }

  // 1. Cargar la información del usuario desde el servidor
  getUserInfo() {
    return this._makeRequest("/users/me");
  }

  // 2. Cargar las tarjetas desde el servidor
  getInitialCards() {
    return this._makeRequest("/cards");
  }

  // 3. Editar el perfil
  updateUser(name, about) {
    return this._makeRequest("/users/me", "PATCH", { name, about });
  }

  // 4. Agregar una nueva tarjeta
  addNewCard(name, link) {
    return this._makeRequest("/cards", "POST", { name, link });
  }

  // 5. Alternar "me gusta" en una tarjeta
  addLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, "PUT");
  }

  removeLike(cardId) {
    return this._makeRequest(`/cards/${cardId}/likes`, "DELETE");
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.removeLike(cardId) : this.addLike(cardId);
  }

  // 6. Eliminar tarjeta
  removeCard(cardId) {
    return this._makeRequest(`/cards/${cardId}`, "DELETE");
  }

  // 7.Actualizar foto de perfil
  updateUserAvatar(avatarUrl) {
    return this._makeRequest(`/users/me/avatar`, "PATCH", {
      avatar: avatarUrl,
    });
  }

  // Método privado para realizar la conexión con el servidor
  _makeRequest(uri, method = "GET", params = {}) {
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };

    if (method !== "GET") {
      config.body = JSON.stringify(params);
    }

    return fetch(`${this._url}${uri}`, config).then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }

      if (res.status === 204) {
        return;
      }

      return res.json();
    });
  }
}

// Variable que se exporta para realizar la conexión
const api = new Api("https://api.aroundxr.mooo.com");

export default api;
