# Tripleten web_project_api_full

# Around The U.S.

Aplicación Full Stack desarrollada durante el programa de TripleTen.

Permite a los usuarios registrarse, iniciar sesión y administrar una colección de fotografías mediante autenticación JWT.

---

## Funcionalidades

- Registro de usuarios
- Inicio de sesión
- Autenticación mediante JWT
- Persistencia de sesión
- Edición de perfil
- Cambio de avatar
- Creación de tarjetas
- Eliminación de tarjetas propias
- Sistema de Like / Dislike
- Visualización ampliada de imágenes
- Protección de rutas mediante React Router
- API REST desplegada en servidor remoto

---

## Tecnologías

### Frontend

- React
- React Router
- Vite
- JavaScript ES6
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcrypt
- Celebrate / Joi
- Winston
- PM2

### Despliegue

- Ubuntu
- Nginx
- SSL (Let's Encrypt)
- FreeDNS

---

## Estructura del proyecto

```
web_project_api_full/

│
├── frontend/
│
├── backend/
│
└── README.md
```

---

## URL de la aplicación

Frontend

https://aroundxr.mooo.com

API

https://api.aroundxr.mooo.com

---

## Capturas

Agregar aquí capturas de:

- Login
- Registro
- Perfil
- Crear tarjeta
- Likes
- Eliminar tarjeta

---

## Video demostración

(Pegar enlace de YouTube o Drive si decides hacerlo)

---

## Instalación

Clonar el repositorio

```bash
git clone <url>
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

Backend

```bash
cd backend
npm install
npm run dev
```

## Seguridad implementada

- Autenticación mediante JWT.
- Contraseñas cifradas con bcrypt.
- Validación de solicitudes con Celebrate/Joi.
- Protección de rutas.
- Los usuarios solo pueden eliminar sus propias tarjetas.
- El hash de la contraseña nunca es enviado al cliente.

---

## Autor

Ximena Rodríguez

Proyecto desarrollado como parte del programa Full Stack Web Developer de TripleTen.
