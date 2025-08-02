import { MailPreview } from "./MailPreview.jsx"

export function MailList({
  mails,
  onRead,
  onRemove,
  setMailId,
  setAddNewMail,
  isMenuOpen,
  onToggleRead,
  onSelectBox,   
  activeBox,
  onToggleStar      
}) {
  return (
    <article className="mail-list">
      <div className={`side-bar ${isMenuOpen ? 'open' : ''}`}>
        <button className="compose-btn" onClick={() => setAddNewMail(true)}><i className="fa-solid fa-pen"></i> Compose</button>
    <div className="side-bar-btn">

        <button
          className={activeBox === 'inbox' ? 'active' : ''}
          onClick={() => onSelectBox('inbox')}
        >
          Inbox
        </button>

        <button
          className={activeBox === 'sent' ? 'active' : ''}
          onClick={() => onSelectBox('sent')}
        >
          Sent
        </button>
        <button
            className={activeBox === 'trash' ? 'active' : ''}
            onClick={() => onSelectBox('trash')}
            >
            <i className="fa-solid fa-trash-can"></i> Trash
       </button>

        <button
          className={activeBox === 'starred' ? 'active' : ''}
          onClick={() => onSelectBox('starred')}
        >
          <i className="fa-regular fa-star"></i> Starred
        </button>
          </div>
      </div>

      <ul>
        {mails.map(mail => (
          <li
            key={mail.id}
            className={`cell ${mail.isRead ? 'read' : ''}`}
            onClick={() => {
              setMailId(mail.id)
              onRead(mail.id)
            }}
          >
            <MailPreview
              mail={mail}
              onRemove={onRemove}
              onRead={onRead}
              onToggleRead={onToggleRead}
              onToggleStar={onToggleStar}
            />
          </li>
        ))}
      </ul>
    </article>
  )
}