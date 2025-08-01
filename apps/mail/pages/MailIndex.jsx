import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailEdit } from "./MailEdit.jsx"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link, Outlet } = ReactRouterDOM

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [readCount, setReadCount] = useState(0)
    const [selectedMailId, setMailId] = useState(null)
    const [addNewMail, setAddNewMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    useEffect(() => {
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
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

    function toggleMenu() {
        setIsMenuOpen(prev => !prev)
    }

    function removeMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mailId !== mail.id))
                showSuccessMsg('Mail has been successfully removed!')
            })
            .catch(() => {
                showErrorMsg(`couldn't remove book`)
                navigate('/book')
            })
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

    function handleSetFilter(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    if (!mails) return <div>Loading...</div>

    return (
        <section className="main-layout">
            <div className="container">
                <h1>Mail app</h1>
                <p>{readCount} Mails to read</p>
                {!selectedMailId && <MailFilter handleSetFilter={handleSetFilter} defaultFilter={filterBy} toggleMenu={toggleMenu} />}
                {selectedMailId && <MailDetails mailId={selectedMailId} setMailId={setMailId} />}
                {!selectedMailId && <MailList mails={mails} onRead={markAsRead} onRemove={removeMail} setMailId={setMailId} setAddNewMail={setAddNewMail} isMenuOpen={isMenuOpen}/>}
                {isMenuOpen && <div className="screen-overlay" onClick={() => toggleMenu(false)}></div>}
                {addNewMail && (<MailEdit onClose={() => setAddNewMail(false)} onSend={handleSendMail} />)}
            </div>
        </section>
    )
}