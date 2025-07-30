import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailDetails() {

    const { mailId } = useParams()
    const navigate = useNavigate()

    const [mail, setMail] = useState(null)

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => console.log('err:', err))
    }

    if (!mail) return <div>Loading...</div>

    return (
       <section className="gmail-message">
            <header className="gmail-message-header">
                <span className="email-subject">{mail.subject}</span>
                <p className="email-sender">{mail.from}</p>
                <p className="email-date">{new Date(mail.sentAt).toLocaleString()}</p>
            </header>

            <main className="gmail-message-body">
                <p className="email-content">{mail.body}</p>
            </main>

            <footer className="gmail-message-footer">
                <p className="email-footer-info">This message sent to: {mail.to}, from {mail.from}</p>
            </footer>
        </section>
    )
}