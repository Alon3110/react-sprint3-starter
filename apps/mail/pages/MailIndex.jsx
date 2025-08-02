import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailDetails } from "./MailDetails.jsx"
import { MailEdit } from "./MailEdit.jsx"
import { showSuccessMsg, showErrorMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, useMemo } = React

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [readCount, setReadCount] = useState(0)
    const [selectedMailId, setMailId] = useState(null)
    const [addNewMail, setAddNewMail] = useState(false)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [mailbox, setMailbox] = useState('inbox')

    const [sortBy, setSortBy] = useState({
        txt: '',
        sortField: 'date',
        sortDir: -1
    })

    useEffect(() => {
        const params = { ...sortBy, txt: filterBy.subject }
        mailService.sortBy(params).then(setMails)
    }, [filterBy, sortBy])

    const displayedMails = useMemo(() => {
        if (!Array.isArray(mails)) return []
        switch (mailbox) {
            case 'inbox':
                return mails.filter(mail => mail.to === 'user@appsus.com' && !mail.removedAt)
            case 'sent':
                return mails.filter(mail => mail.from === 'user@appsus.com' && !mail.removedAt)
            case 'trash':
                return mails.filter(mail => mail.removedAt)
            case 'starred':
                return mails.filter(m => m.isStarred && !m.removedAt)
            default:
                return mails
        }
    }, [mails, mailbox])

    useEffect(() => {
        const unread = displayedMails.filter(mail => !mail.isRead).length
        setReadCount(unread)
    }, [displayedMails])

    function toggleRead(mailId) {
        setMails(prev => prev.map(mail =>
            mail.id === mailId ? { ...mail, isRead: !mail.isRead } : mail))
        const changed = mails.find(mail => mail.id === mailId)
        if (changed) mailService.save({ ...changed, isRead: !changed.isRead })
    }

    function toggleStar(mailId) {
        setMails(prev =>
            prev.map(m =>
                m.id === mailId ? { ...m, isStarred: !m.isStarred } : m
            )
        )
        const t = mails.find(m => m.id === mailId)
        if (t) mailService.save({ ...t, isStarred: !t.isStarred })
    }

    function removeMail(mailId) {
        if (mailbox === 'trash') {
            mailService.remove(mailId).then(() => {
                setMails(prev => prev.filter(m => m.id !== mailId))
                showSuccessMsg('Mail deleted')
            })
                .catch(() => showErrorMsg("Couldn't delete mail"))
            return
        }
        setMails(prev =>
            prev.map(m =>
                m.id === mailId ? { ...m, removedAt: Date.now() } : m
            )

        )
        const target = mails.find(m => m.id === mailId)
        if (target && !target.removedAt) {
            mailService.save({ ...target, removedAt: Date.now() })
            showSuccessMsg('Moved to Trash')
        }

    }

    function markAsRead(mailId) {
        setMails(prev => prev.map(mail =>
            mail.id === mailId ? { ...mail, isRead: true } : mail))
        const target = mails.find(mail => mail.id === mailId)
        if (target && !target.isRead) mailService.save({ ...target, isRead: true })
    }

    function handleSendMail(newMail) {
        mailService.save(newMail).then(() => {
            mailService.sortBy({ ...sortBy, txt: filterBy.subject }).then(setMails)
            setAddNewMail(false)
        })
    }

    if (!mails) return <div>Loading…</div>

    return (
        <section className="main-layout">
            <div className="container">
                <header className="main-header">
                    {!selectedMailId && (<button className="btn-toggle-menu" onClick={() => setIsMenuOpen(p => !p)}>☰</button>)}
                    <img src="/apps/mail/img/gmail-logo.png" alt="" />
                    
                    {!selectedMailId && (
                        <MailFilter
                            defaultFilter={filterBy}
                            handleSetFilter={nf => setFilterBy(p => ({ ...p, ...nf }))}
                            sortBy={sortBy}
                            onUpdate={setSortBy}
                        />
                    )}
                </header>

                {selectedMailId && (
                    <MailDetails mailId={selectedMailId} setMailId={setMailId} />
                )}

                <p>{readCount} mails to read</p>

                {!selectedMailId && (
                    <MailList
                        mails={displayedMails}
                        onRead={markAsRead}
                        onRemove={removeMail}
                        setMailId={setMailId}
                        setAddNewMail={setAddNewMail}
                        isMenuOpen={isMenuOpen}
                        onToggleRead={toggleRead}
                        onSelectBox={setMailbox}
                        activeBox={mailbox}
                        onToggleStar={toggleStar}
                    />
                )}

                {isMenuOpen && (
                    <div className="screen-overlay" onClick={() => setIsMenuOpen(false)} />
                )}

                {addNewMail && (
                    <MailEdit onClose={() => setAddNewMail(false)} onSend={handleSendMail} />
                )}
            </div>
        </section>
    )
}