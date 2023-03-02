import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-slice';
import {getFilteredContacts} from '../../redux/contacts/contacts-selectors';


export const ContactList = () => {

const filteredContacts = useSelector(getFilteredContacts);

const dispatch = useDispatch();

const handleDeleteContact = id => {
  dispatch(deleteContact(id));
};

  
  const contact = filteredContacts.map(({ id, name, number }) => (
    <li className={css.item} key={id}>
      {name}: {number}
      <button
        onClick={() => handleDeleteContact(id)}
        type="button"
        className={css.btn}
      >
        Delete
      </button>
    </li>
  ));

  return <ul className={css.list}>{contact}</ul>;
};
