import React, { useState } from 'react';
import FormInput from './Form-input/form-input';
import ContactList from './Contact-list/contact-list';
import Filter from './Filter/filter';
import { nanoid } from 'nanoid';

import NotificationMessage from './notification-message/NotificationMessage';

export const App = () => {
  const savedContanctsInLocalStore = JSON.parse(localStorage.getItem('contactsList')) || [];
  const [contacts, setContacts] = useState(savedContanctsInLocalStore);
  const [filter, setFilter] = useState('');
  const sendContactData = data => {
    const isContact = contacts.find(el => el.number === data.number);
    if (isContact) return alert('Контакт Існує');
    
    const newContact = { ...data, id: nanoid() };
    setContacts(prevState => [...prevState, newContact]);
    const contactsFromLocalStorage =
      JSON.parse(localStorage.getItem('contactsList')) || [];
    const updatedContacts = [...contactsFromLocalStorage, newContact];

    localStorage.setItem('contactsList', JSON.stringify(updatedContacts));
  };
  const deleteContact = id => {
    setContacts(prev => prev.filter(el => el.id !== id));
    const contactsFromLocalStorage =
      JSON.parse(localStorage.getItem('contactsList')) || [];
    const updatedContacts = [
      ...contactsFromLocalStorage.filter(el => el.id !== id),
    ];
    localStorage.setItem('contactsList', JSON.stringify(updatedContacts));
  };
  const filterContact = ({ target: { value } }) => setFilter(value);
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div
      style={{
        width: '300px',
        margin: '200px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <h1>PhoneBook</h1>
      <FormInput sendContactData={sendContactData} />
      <h2>Contacts</h2>
      <Filter change={filterContact} />
      {filteredContacts.length === 0 ? (
        <NotificationMessage message={`No contact ${filter}`} />
      ) : (
        <ContactList contacts={filteredContacts} handleClick={deleteContact} />
      )}
    </div>
  );
};
