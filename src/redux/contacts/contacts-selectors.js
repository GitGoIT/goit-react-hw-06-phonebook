export const getAllContacts = store => store.contacts;
export const getFilteredContacts = ({ contacts, filter }) => {
    if (!filter) {    // cheking if filter input is empty (false) then do nothing
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return result;
};