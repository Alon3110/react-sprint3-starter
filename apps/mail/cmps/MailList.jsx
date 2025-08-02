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
  activeBox      
}) {
  return (
    <article className="mail-list">
      <div className={`side-bar ${isMenuOpen ? 'open' : ''}`}>
        <button className="compose-btn" onClick={() => setAddNewMail(true)}>Compose</button>

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

        <button disabled>Stared</button>
        <button disabled>Draft</button>
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
            />
          </li>
        ))}
      </ul>
    </article>
  )
}

// import { MailPreview } from "./MailPreview.jsx";

// export function MailList({
//     mails,
//     onRead,
//     onRemove,
//     setMailId,
//     setAddNewMail,
//     isMenuOpen,
//     onToggleRead
// }) {
//     console.log(mails);
    

//     return (
//         <article className="mail-list">

//             <div className={`side-bar ${isMenuOpen ? 'open' : ''}`}>
//                 <button className="compose-btn" onClick={() => setAddNewMail(true)}>Compose</button>
//                 <button>Inbox</button>
//                 <button>Sent</button>
//                 <button>Stared</button>
//                 <button>Draft</button>
//             </div>
//             <ul>
//                 {mails.map(mail => (
//                     <li
//                         key={mail.id}
//                         className={`cell ${mail.isRead ? 'read' : ''}`}
//                         onClick={() => {
//                             setMailId(mail.id)
//                             onRead(mail.id)
//                         }}
//                     >
//                         <MailPreview mail={mail} onRemove={onRemove} onRead={onRead} onToggleRead={onToggleRead} />

//                     </li>
//                 ))}
//             </ul>
//         </article>
//     )
// }
