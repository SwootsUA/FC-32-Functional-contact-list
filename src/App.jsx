import {useState, useEffect, useRef} from 'react';
import './App.css';
import ContactList from './components/ContactList/ContactList';
import ContactForm from './components/ContactForm/ContactForm';
import {nanoid} from 'nanoid';

const EMPTY_CONTACT = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
};

function App() {
    const [currentContact, setCurrentContact] = useState({...EMPTY_CONTACT});
    const [contacts, setContacts] = useState([]);
    const isInitialMount = useRef(true);

    useEffect(() => {
        const localContacts = JSON.parse(localStorage.getItem('contacts'));

        if (localContacts) {
            setContacts(localContacts);
        }
    }, []);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            // Do not run on mount to not clear up the localStorage
            return;
        }
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    function saveContact(passedContact) {
        if (passedContact.id) {
            editContact(passedContact);
        } else {
            addContact(passedContact);
        }
    }

    function editContact(passedContact) {
        setContacts(
            contacts.map(contact =>
                contact.id === passedContact.id ? passedContact : contact
            )
        );
    }

    function addContact(passedContact) {
        const newContact = {
            ...passedContact,
            id: nanoid(),
        };

        setContacts([...contacts, newContact]);
        exitEditMode();
    }

    function deleteContact(passedId) {
        const deleteId = passedId ? passedId : currentContact.id;

        if (deleteId === currentContact.id) {
            exitEditMode();
        }

        setContacts(contacts.filter(contact => contact.id !== deleteId));
    }

    function enterEditMode(passedId) {
        setCurrentContact(contacts.find(contact => contact.id === passedId));
    }

    function exitEditMode() {
        setCurrentContact({...EMPTY_CONTACT});
    }

    return (
        <>
            <header>
                <h1>Contact list</h1>
            </header>

            <ContactList
                contacts={contacts}
                enterEditMode={enterEditMode}
                deleteContact={deleteContact}
            />

            <ContactForm
                currentContact={currentContact}
                saveContact={saveContact}
                deleteContact={deleteContact}
                EMPTY_CONTACT={EMPTY_CONTACT}
            />

            <div className="btn-container">
                <button onClick={exitEditMode}>New</button>
            </div>
        </>
    );
}

export default App;
