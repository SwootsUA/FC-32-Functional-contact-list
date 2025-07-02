import ListItem from '../ListItem/ListItem';
import './ContactList.css';

import React from 'react';

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
