function ImagePopup(props) {
    return (
      <section 
        className={
          `popup popup_type_${props.name} 
          ${props.card.link ? 'popup_opened' : ''}`
        } 
      >
        <div className="popup-preview-card__content">
          <button 
            className="popup__close-button 
              popup-preview-card__close-button 
              opacity-transition" 
            type="button" 
            aria-label="Закрыть"
            onClick ={props.onClose}>
          </button>
          <img 
            className="popup-preview-card__image" 
            src={props.card.link} 
            alt={props.card.name} 
          />
          <h2 className="popup-preview-card__title">
            {props.card.name}
          </h2>
        </div>
      </section>
    );
  }
  
  export default ImagePopup;