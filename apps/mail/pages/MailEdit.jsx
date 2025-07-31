import { AddMail } from "../cmps/AddMail.jsx"

export function MailEdit({ onClose, onSend }) {
    return (
        <div className="compose-modal">
            <div className="modal-header">
            <button className="close-modal" onClick={onClose}>X</button>
            </div>
            <AddMail onSubmit={onSend} />
        </div>
    )
}