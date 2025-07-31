import { AddMail } from "../cmps/AddMail.jsx"

export function MailEdit({ onClose, onSend }) {
    return (
        <div className="compose-modal">
            <button onClick={onClose}>X</button>
            <AddMail onSubmit={onSend} />
        </div>
    )
}