const { useState, useEffect } = React

export function MailPreview({ mail, onRemove, onToggleRead }) {
    
    const [mailRead, setMailRead] = useState(mail.isRead)

    useEffect(() => setMailRead(mail.isRead), [mail.isRead])

    function handleToggle(ev) {
        ev.stopPropagation()
        setMailRead(prev => !prev)
        onToggleRead(mail.id)
    }

    return (
        <div className="details">
            <div className="content">
                <h2>{mail.to}</h2>
                <h4>
                    {mail.subject} <span>{mail.body}</span>
                </h4>
                <p>{new Date(mail.sentAt).toLocaleString()}</p>
            </div>

            <div className="preview-btn">
                <button
                    className="close"
                    onClick={ev => {
                        ev.stopPropagation()
                        onRemove(mail.id)
                    }}
                >
                    <i className="fa-solid fa-trash-can"></i>
                </button>

                <button className="unread" onClick={handleToggle}>
                    <i
                        className={
                            mailRead
                                ? 'fa-solid fa-envelope-open'
                                : 'fa-solid fa-envelope'
                        }
                    ></i>
                </button>
            </div>
        </div>
    )
}