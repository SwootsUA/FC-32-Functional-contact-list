import PropTypes from 'prop-types';
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

ContactList.defaultProps = {
    contacts: [],
};

ContactList.propTypes = {
    contacts: PropTypes.array,
};

export default ContactList;
