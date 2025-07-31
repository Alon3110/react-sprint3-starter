const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailPreview({ mail, onRemove }) {

    return (
        <div className="details">
            <div className="content">
            <h2>{mail.to}</h2>
            <h4>{mail.subject} <span>{mail.body}</span></h4>
            <p>{new Date(mail.sentAt).toLocaleString()}</p>
            </div>
            <button onClick={(ev) => {
                ev.stopPropagation(),
                onRemove(mail.id)
            }}
                className='close'>Remove<i className="fa-solid fa-trash-can"></i></button>                
        </div>
    )
}