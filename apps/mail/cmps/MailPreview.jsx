const { useState, useEffect } = React

export function MailPreview({ mail, onRemove, onToggleRead, onToggleStar }) {

    const [mailRead, setMailRead] = useState(mail.isRead)
    const displayAddress =
     mail.to === 'user@appsus.com' ? mail.from : mail.to

    useEffect(() => setMailRead(mail.isRead), [mail.isRead])

    function handleToggle(ev) {
        ev.stopPropagation()
        setMailRead(prev => !prev)
        onToggleRead(mail.id)
    }

    return (
        <div className="details">
            <div className="content">
                <div className="star-btn">
                    <button
                        className="star"
                        onClick={ev => {
                            ev.stopPropagation()
                            onToggleStar(mail.id)
                        }}
                    >
                        <i
                            className={
                                mail.isStarred
                                    ? 'fa-solid fa-star'
                                    : 'fa-regular fa-star'
                            }
                        ></i>
                    </button>
                </div>
                <div className="mail-details">
                    <h2>{displayAddress}</h2>
                    <h4>
                        {mail.subject} <span>{mail.body}</span>
                    </h4>
                    <p>{new Date(mail.sentAt).toLocaleString()}</p>
                </div>
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
                                ? 'fa-regular fa-envelope-open'
                                : 'fa-regular fa-envelope'
                        }
                    ></i>
                </button>
            </div>
        </div>
    )
}