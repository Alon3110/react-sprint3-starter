const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailPreview({ mails, onRead }) {
    if (!Array.isArray(mails)) {
        console.warn('Expected array but got:', mails)
        return <p>Error: Invalid mails data</p>
    }

    const navigate = useNavigate()

    function handleClick(mailId) {
        onRead(mailId)
        setTimeout(() => navigate(`/mail/${mailId}`), 100)
    }

    return (
        <article className="mail-preview">
            <ul>
                {mails.map(mail => (
                    <li
                        key={mail.id}
                        className={`cell ${mail.isRead ? 'read' : ''}`}
                        onClick={() => handleClick(mail.id)}
                    >
                        <div className="details">
                            <h2>{mail.from}</h2>
                            <h4>{mail.subject} <span>{mail.body}</span></h4>
                            <p>{new Date(mail.sentAt).toLocaleString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    )
}
