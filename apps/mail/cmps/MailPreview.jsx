export function MailPreview( { mails } ) {
    
    if (!Array.isArray(mails)) {
        console.warn('Expected array but got:', mails)
        return <p>Error: Invalid mails data</p>
    }
    console.log(mails);
    
    return (
        <article className="mail-preview">
            <ul>
                {mails.map(mail => (
                    <li className="cell" key={mail.id}>
                        <h2>{mail.from}</h2>
                        <h4>{mail.subject} <span>{mail.body}</span></h4>
                        <p>{new Date(mail.sentAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </article>
    )
}
