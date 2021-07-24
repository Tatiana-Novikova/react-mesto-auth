import React from 'react';

function PopupWithForm (props) {
  
  return (
    <section className=
      {`popup popup_type_${props.name} 
      ${props.isOpen ? 'popup_opened' : ''}`
      } 
    >
      <div className='popup__content'>
        <button 
          className={`popup__close-button opacity-transition`} 
          type='button' 
          aria-label='Закрыть'
          onClick ={props.onClose}
        />
        <h2 className='popup__title'>{props.title}</h2>
        <form 
          className='form' 
          name={props.name}
          onSubmit={props.onSubmit}
          noValidate 
          autoComplete='off'
        >
        {props.children}
          <button
            className='
              form__submit-button
              form__submit-button_place_popups
              opacity-transition
            ' 
            type='submit'
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;