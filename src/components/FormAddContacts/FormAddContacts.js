import {useState} from "react";
import PropTypes from 'prop-types';
import css from './FormAddContact.module.css';


export const FormAddContacts = ({ onSubmit})=>{
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
    
    const hendleChange = e => {
    const { name, value } = e.currentTarget;
    
      switch (name) {
        case 'name':
          setName(value);
          break;
        
        case 'number':
          setNumber(value);
          break;
        
        default: return;
      }

    };

    const hendleSubmit = e => {
    e.preventDefault();
       
    onSubmit({name,number})
    reset();
    };
    
  const reset = () => {
    setName('');
    setNumber('');
    };
    
    
        return (
            <>
            <form  className = {css.formAddContact} onSubmit={hendleSubmit}> 
          <label className={css.formInputTitle}>
          Ім'я 
            <input
            className={css.formInput}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Назва може містити лише літери, апостроф, тире та пробіли. Наприклад Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              value={name}
              onChange={hendleChange}   
                  />
          </label>
           <label className={css.formInputTitle}>
           Номер
            <input
            className={css.formInput}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Номер телефону має складатися з цифр і може містити пробіли, тире, круглі дужки та починатися з +"
                required
                value={number}
                onChange={hendleChange}
            />
          </label>
          
          <button  className ={css.addBtn} type="submit">Додати</button>
        </form></>
        )
    
};

FormAddContacts.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}