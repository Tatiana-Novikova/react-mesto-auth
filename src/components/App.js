import React from 'react';
import api from '../utils/api.js';
import Header from './Header.js';
import Main from './Main.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import { CurrentUserContext } from './../contexts/CurrentUserContext.js';

function App() {
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isAddCardPopupOpened, setIsAddCardPopupOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpened(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpened(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpened(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleDeleteCardClick(card) {
    setCardToDelete(card);
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
    .then((userData) => {
      setCurrentUser(userData);
      setIsEditAvatarPopupOpened(false);
    })
    .catch((error) => console.log(error));
  }

  function handleEditProfile(user) {
    api.updateUserInfo(user)
    .then((userData) => {
      setCurrentUser(userData);
      setIsEditProfilePopupOpened(false);
    })
    .catch((error) => console.log(error));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
    .then ((newCard) => {
      setCards([newCard, ...cards]);
      setIsAddCardPopupOpened(false);
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((c) => 
            c._id === card._id ? newCard : c))
      })
      .catch((error) => console.log(error));
  }

  function handleDeletePlaceSubmit(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        setCards((cards) => 
          cards.filter((c) => 
            c._id !== card._id))
        setCardToDelete(null);
      })
      .catch((error) => console.log(error));
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsAddCardPopupOpened(false);
    setCardToDelete(null);
    setSelectedCard(false);
  }

  React.useEffect(() => {
    Promise.all([ 
      api.getUserInfo(),
      api.getInitialCards()
      ])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="page">
      <div className="page-container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddCard={handleAddCardClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
          />
          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpened} 
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} 
          /> 
          <EditProfilePopup 
            isOpen={isEditProfilePopupOpened} 
            onClose={closeAllPopups}
            onEditProfile={handleEditProfile}
          />
          <AddPlacePopup 
            isOpen={isAddCardPopupOpened} 
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeletePlacePopup 
            isOpen={!!cardToDelete} 
            onClose={closeAllPopups}
            onDeletePlace={handleDeletePlaceSubmit}
            card={cardToDelete}
          />
          <ImagePopup
            name='preview-card'
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
