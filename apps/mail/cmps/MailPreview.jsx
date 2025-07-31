const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailPreview({ mail, onRemove }) {

        
    return (
        <div className="details">
            <h2>{mail.from}</h2>
            <h4>{mail.subject} <span>{mail.body}</span></h4>
            <p>{new Date(mail.sentAt).toLocaleString()}</p>
            <button onClick={(ev) => { ev.stopPropagation(), onRemove(mail.id)}} className='close'>Remove<i class="fa-solid fa-trash-can"></i></button>
        </div>
    )
}