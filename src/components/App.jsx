import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm.jsx';
import { ContactList } from './ContactList/ContactList.jsx';
import { Filter } from './Filter/Filter.jsx';
import { store } from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact} from '../redux/contacts/contacts-actions';
import { setFilter } from '../redux/filter/filter-actions';
import { getAllContacts, getFilteredContacts} from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

export const App = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);
  // const [contacts, setContacts] = useState(() => {
  //   const contacts = JSON.parse(localStorage.getItem('my-contacts'));
  //   return contacts?.length ? contacts : []; // cheking if contacs.length > 0 return contacts, else return [] empty array
  // });
  // const [filter, setFilter] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('my-contacts', JSON.stringify(allContacts));
  }, [allContacts]);

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
    if (isDublicate(name, number)) {
      // cheking for dublicate in state list
      return alert(
        `Name: "${name}" or number: "${number}" is already in contacts, please check the contacts list`
      );
    }
    dispatch(addContact({ name, number }));

    // setContacts(prevContacts => {
    //   const newContact = {
    //     id: nanoid(),
    //     name,
    //     number,
    //   };
    //   return [newContact, ...prevContacts];
    // });
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const handleFilter = ({ target }) => {dispatch(setFilter(target.value))};



  return (
    <div
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '70vh',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 26,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <Filter value={filter} handleChange={handleFilter} />
      <>
        {filteredContacts.length !== 0 && (
          <ContactList
            contacts={filteredContacts}
            deleteContact={handleDeleteContact}
          />
        )}
        {filteredContacts.length === 0 && (
          <p
            style={{
              marginTop: '40px',
              fontSize: '19px',
              color: '#1a80d4',
            }}
          >
            Your contacts list is empty. Please add contact.
          </p>
        )}
      </>
    </div>
  );
};
