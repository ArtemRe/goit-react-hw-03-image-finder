import { nanoid } from 'nanoid';
import { Component } from 'react';
import FormAddContacts from './ContactForm/ContactForm';
import PhoneBookList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container } from './PhoneBook.module';

export default class PhoneBook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    if (this.isDuplicate(data)) {
      return alert(`${data.name} is alreay in contacts.`);
    }
    this.setState(prev => {
      const newContact = {
        id: nanoid(),
        ...data,
      };
      return {
        contacts: [...prev.contacts, newContact],
      };
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  getFilteredContacts() {
    const { contacts, filter } = this.state;

    if (!filter) {
      return contacts;
    }

    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        number.includes(normalizedFilter);
      return result;
    });

    return filteredContacts;
  }

  removeContact = id => {
    this.setState(prev => {    
      return {
        contacts: prev.contacts.filter(item => item.id !== id),
      };
    });
  };

  isDuplicate({ name, number }) {
    const { contacts } = this.state;
    const result = contacts.find(
      item => item.name === name && item.number === number
    );
    return result;
  }

  render() {
    const { addContact, handleChange, removeContact } = this;
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();

    return (
      <Container>
        <div className="block">
          <h1>PhoneBook</h1>
          <FormAddContacts addContact={addContact} />
        </div>
        <div className="block">
          <h2>Contacts</h2>
          <Filter filter={filter} handleChange={handleChange} />
          <PhoneBookList items={contacts} removeContact={removeContact} />
        </div>
      </Container>
    );
  }
}