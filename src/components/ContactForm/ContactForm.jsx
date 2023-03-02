import css from './/ContactForm.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';
import { addContact } from '../../redux/contacts/contacts-slice';

const initialState = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const [state, setState] = useState({ ...initialState });
  const allContacts = useSelector(getAllContacts);

  const dispatch = useDispatch();

  const isDublicate = (name, number) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const result = allContacts.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName ||
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(result);
  };

  const handleAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {  // cheking for dublicate in state list
      return alert(
        `Name: "${name}" or number: "${number}" is already in contacts, please check the contacts list`
      );
    }
    dispatch(addContact({ name, number }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact({ ...state });
    setState({ ...initialState }); // reset function
  };

  const { name, number } = state;

  return (
    <form className={css.container} onSubmit={handleSubmit}>
      <div className={css.block}>
        <label htmlFor="">Name</label>
        <input
          onChange={handleChange}
          value={name}
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={css.block}>
        <label htmlFor="">Number</label>
        <input
          onChange={handleChange}
          value={number}
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};
