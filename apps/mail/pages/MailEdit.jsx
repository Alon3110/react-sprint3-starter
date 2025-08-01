import { AddMail } from "../cmps/AddMail.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailEdit({ onClose, onSend }) {

    const [mail, setMail] = useState(mailService.getEmptyMail())

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setMail(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div className="compose-modal">
            <div className="modal-header">
            <button className="close-modal" onClick={onClose}>X</button>
            </div>
            <AddMail onSubmit={onSend} mail={mail} onChange={handleChange}/>
        </div>
    )
}