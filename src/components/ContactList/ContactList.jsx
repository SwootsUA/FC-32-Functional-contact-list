import ListItem from '../ListItem/ListItem';
import './ContactList.css';

function ContactList({contacts, enterEditMode, deleteContact}) {
    return (
        <div className="scroll-box">
            <ul>
                {contacts.map(contact => (
                    <ListItem
                        contact={contact}
                        enterEditMode={enterEditMode}
                        key={contact.id}
                        deleteContact={deleteContact}
                    />
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
