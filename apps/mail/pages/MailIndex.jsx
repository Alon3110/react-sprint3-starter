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

    const [sortBy, setSortBy] = useState({
        txt: '',
        sortField: 'date',
        sortDir: -1
    })

    useEffect(() => {
        const params = { ...sortBy, txt: filterBy.subject }
        mailService.sortBy(params).then(setMails)
    }, [filterBy, sortBy])

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

    function toggleRead(mailId) {
        setMails(prev =>
            prev.map(mail =>
                mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail
            )
        )
        const changed = mails.find(mail => mail.id === mailId)
        if (changed) mailService.save({ ...changed, isRead: !changed.isRead })
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

    function toggleMenu() {
        setIsMenuOpen(prev => !prev)
    }

    function handleSendMail(newMail) {
        mailService.save(newMail).then(() => {
            mailService
                .sortBy({ ...sortBy, txt: filterBy.subject })
                .then(setMails)

            setAddNew(false)
        })
    }

    function handleSetFilter(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    if (!mails) return <div>Loading...</div>

    return (
        <section className="main-layout">
            <div className="container">
                <header className="main-header">
                    <p className="logo">Gmail</p>
                    <img src="/apps/mail/img/gmail-logo.png" alt="" />
                    {!selectedMailId && <MailFilter handleSetFilter={handleSetFilter} defaultFilter={filterBy} toggleMenu={toggleMenu} sortBy={sortBy} onUpdate={setSortBy} />}
                </header>
                {selectedMailId && <MailDetails mailId={selectedMailId} setMailId={setMailId} />}
                <div>
                    <p>{readCount} Mails to read</p>
                </div>
                {!selectedMailId && <MailList mails={mails} onRead={markAsRead} onRemove={removeMail} setMailId={setMailId} setAddNewMail={setAddNewMail} isMenuOpen={isMenuOpen} onToggleRead={toggleRead} />}
                {isMenuOpen && <div className="screen-overlay" onClick={() => toggleMenu(false)}></div>}
                {addNewMail && (<MailEdit onClose={() => setAddNewMail(false)} onSend={handleSendMail} />)}
            </div>
        </section>
    )
}