import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRead, setMailId }) {

    return (
        <article>
            <h1>{mails.to}</h1>
            <MailPreview mails={mails} onRead={onRead} setMailId={setMailId}/>
        </article>
    )
}
