import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => setMails(mails))
            .catch(err => console.log('err:', err))
    }    

    if (!mails) return <div>Loading...</div>

    return (
        <section className="container">
            <h1>Mail app</h1>
            {mails && <MailList mails={mails} />}
        </section>
    )
}

