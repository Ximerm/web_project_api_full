const BASE_URL = "https://api.aroundxr.mooo.com";

//Registro
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Error en el registro: ${res.status}`);
  });
};

//Autorización usuarios
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Error en el login: ${res.status}`);
  });
};

//Verificar token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(`Token inválido: ${res.status}`);
  });
};
