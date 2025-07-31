import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRead, onRemove, setMailId }) {

    return (
        <article className="mail-list">
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
                        <MailPreview mail={mail} onRemove={onRemove} />

                    </li>
                ))}
            </ul>
        </article>
    )
}
