import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

// Nuevas funciones
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

import api from "../utils/api";

import { authorize, register, checkToken } from "../utils/auth";

function App() {
  //Estados
  //Estado usuario
  const [currentUser, setCurrentUser] = useState({});
  // Estado del popup
  const [popup, setPopup] = useState(null);
  //Estado tarjetas
  const [cards, setCards] = useState([]);

  //Nuevos estados autenticación
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [userEmail, setUserEmail] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  //useEffect checkToken

  useEffect(() => {
    if (!token) return;

    checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(res.email);

        navigate("/");
      })
      .catch((err) => {
        console.error("Token inválido:", err);

        localStorage.removeItem("jwt");
        setToken("");
        setLoggedIn(false);
      });
  }, [token, navigate]);

  //
  useEffect(() => {
    if (!loggedIn) return;

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.error("ERROR API:", err);
      });
  }, [loggedIn]);

  //Abrir popup
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  // Función para cerrar el popup
  function handleClosePopup() {
    setPopup(null);
  }

  //Registro
  const handleRegister = (email, password) => {
    register(email, password)
      .then((res) => {
        if (res) {
          setIsSuccess(true);
          navigate("/signin");
        } else {
          setIsSuccess(false);
        }

        setIsTooltipOpen(true);
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  //Login
  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setToken(data.token);

          return checkToken(data.token);
        }

        return Promise.reject("No se recibió token");
      })
      .then((tokenData) => {
        setLoggedIn(true);

        setUserEmail(tokenData.email);

        navigate("/");
      })
      .catch((err) => {
        console.error("Error en login:", err);

        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken("");

    setLoggedIn(false);
    setUserEmail("");
    setCurrentUser({});
    setCards([]);

    navigate("/signin");
  };

  //Funciones página de usuario

  //Cambiar información de perfil
  const handleUpdateUser = (data) => {
    api
      .updateUser(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch(console.error);
  };

  //Cambiar Avatar
  const handleUpdateAvatar = (data) => {
    api
      .updateUserAvatar(data.avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleClosePopup();
      })
      .catch(console.error);
  };

  // Agrega el soporte de "likes" y "dislikes"
  function handleCardLike(card) {
    // Verifica si el usuario actual ya dio like
    const isLiked = card.likes.some(
      (like) => (like._id || like) === currentUser._id,
    );
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((prevCards) =>
          prevCards.map((currentCard) =>
            currentCard._id === newCard._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  //Eliminar tarjeta
  async function handleCardDelete(cardId) {
    await api.removeCard(cardId);

    setCards((prevCards) => prevCards.filter((card) => card._id !== cardId));
  }

  //Agregar Nueva tarjeta
  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleCardLike,
        handleCardDelete,
        handleAddPlaceSubmit,
      }}
    >
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />

          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />

          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={
                  <>
                    <Main
                      onOpenPopup={handleOpenPopup}
                      onClosePopup={handleClosePopup}
                      popup={popup}
                      cards={cards}
                    />

                    <Footer />
                  </>
                }
              />
            }
          />
        </Routes>

        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={() => setIsTooltipOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
