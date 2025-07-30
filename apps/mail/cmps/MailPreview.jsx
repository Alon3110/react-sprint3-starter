const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    
    return (
        <div className="details">
            <h2>{mail.from}</h2>
            <h4>{mail.subject} <span>{mail.body}</span></h4>
            <p>{new Date(mail.sentAt).toLocaleString()}</p>
        </div>
    )
}