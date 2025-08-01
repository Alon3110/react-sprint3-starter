import { MailPreview } from "./MailPreview.jsx";

export function MailList({
    mails,
    onRead,
    onRemove,
    setMailId,
    setAddNewMail,
    isMenuOpen,
    onToggleRead
}) {

    return (
        <article className="mail-list">

            <div className={`side-bar ${isMenuOpen ? 'open' : ''}`}>
                <button className="compose-btn" onClick={() => setAddNewMail(true)}>Compose</button>
                <p>Inbox</p>
                <p>Sent</p>
                <p>Stared</p>
                <p>Draft</p>
            </div>
            <ul>
                {mails.map(mail => (
                    <li
                        key={mail.id}
                        className={`cell ${mail.isRead ? 'read' : ''}`}
                        onClick={() => {
                            setMailId(mail.id)
                            onRead(mail.id)
                        }}
                    >
                        <MailPreview mail={mail} onRemove={onRemove} onRead={onRead} onToggleRead={onToggleRead} />

                    </li>
                ))}
            </ul>
        </article>
    )
}
