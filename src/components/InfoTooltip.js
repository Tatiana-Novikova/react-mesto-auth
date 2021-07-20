import React from "react";
import auth_success from '../images/auth-success.svg';
import auth_fail from '../images/auth-fail.svg';

function InfoTooltip (props) {
  
  return (
    <section className=
      {`popup
      ${props.isOpen ? 'popup_opened' : ''}`
      } 
    >
      <div className="popup__content popup__content_place_info-tooltip">
        <button 
          className={`popup__close-button opacity-transition`} 
          type="button" 
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <figure className='popup__image-container'>
          <img 
            className="popup__image"
            src={`${props.registed
              ? auth_success
              : auth_fail
            }`}
            alt={props.title} 
          />
          <h2 className='popup__title popup__title_place_info-tooltip'
          >{`${props.registed
              ? 'Вы успешно зарегистрировались!' 
              : 'Что-то пошло не так! Попробуйте ещё раз.'
            }`}
          </h2>
        </figure>
      </div>
    </section>
  );
}

export default InfoTooltip;