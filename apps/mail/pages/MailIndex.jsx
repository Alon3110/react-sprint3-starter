import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailEdit } from "./MailEdit.jsx"

const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [readCount, setReadCount] = useState(0)
    const [selectedMailId, setMailId] = useState(null)
    const [addNewMail, setAddNewMail] = useState(false)


    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(mails => {
                setMails(mails)
            })
            .catch(err => console.log('err:', err))
    }

    useEffect(() => {
        if (Array.isArray(mails)) updateReadCount(mails)
    })

    function updateReadCount() {
        if (!Array.isArray(mails)) return
        const count = mails.filter(mail => !mail.isRead).length
        setReadCount(count)
    }

    function markAsRead(mailId) {
        let updatedMail = null

        const updatedMails = mails.map(mail => {
            if (mail.id === mailId && !mail.isRead) {
                updatedMail = { ...mail, isRead: true }
                return updatedMail
            } else {
                return mail
            }
        })

        setMails(updatedMails)

        if (updatedMail) {
            mailService.save(updatedMail)
        }
    }

    function handleSendMail(newMail) {
        mailService.save(newMail).then(() => {
            loadMails()
            setAddNewMail(false)
        })
    }

    if (!mails) return <div>Loading...</div>

    return (
        <section className="container">
            <h1>Mail app</h1>
            <p>{readCount} Mails to read</p>
            <button onClick={() => setAddNewMail(true)}>Compose</button>
            {selectedMailId && <MailDetails mailId={selectedMailId} setMailId={setMailId} />}
            {!selectedMailId && <MailList mails={mails} onRead={markAsRead} setMailId={setMailId} />}
            {addNewMail && (<MailEdit onClose={() => setAddNewMail(false)} onSend={handleSendMail} />)}
        </section>
    )
}