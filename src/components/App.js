import {useState, useEffect} from "react";
import shortid from 'shortid';
import { FormAddContacts } from "./FormAddContacts/FormAddContacts";
import { ContactsList } from "./ContactsList/ContactList";
import { FilterContacts } from "./FilterContacts/FilterContacts";

export const App = () => {
  
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ??
    [{id: 'id-1', name: 'Thierry Henry', number: '159-11-16'},
    {id: 'id-2', name: 'Laurent Blanc', number: '433-83-13'},
    {id: 'id-3', name: 'Fabien Barthez', number: '545-57-79'},
    { id: 'id-4', name: 'Zinédine Zidane', number: '277-91-76' },]
  );
  const [filter, setFilter] = useState('');
  

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts)) 
  }, [contacts]);


  const formSubmitHandler = data => {
    if (contacts.find(contact => (data.name === contact.name))){
      alert(data.name + ' is already in contacts' )
    }
    else {
      setContacts([...contacts, { name: data.name, number: data.number, id: shortid.generate() }]);
    }
  };


  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };



  const getFilterListContact = () => {
     return contacts.filter(contact => contact.name.toLowerCase().includes(filter));
  };
  

  const deleteContact = (contactId) => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== contactId)));
  };

    return (
      <>
        <h1 className="headlineApp">Телефонна книга</h1>
        
        <FormAddContacts onSubmit={formSubmitHandler} />
       
        <FilterContacts
          contact={filter}
          filter={changeFilter}
        />
      
        <h2 className="contactListTitle">Контакти</h2>

        {filter !== ''?  <ContactsList
          contacts={getFilterListContact()}
          onDeleteContact = {deleteContact}
        />:<ContactsList
          contacts={contacts}
          onDeleteContact = {deleteContact}/>}
      
    
      </>
    );
  
};

