import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRead }) {

    return (
        <article>
            <h1>{mails.to}</h1>
            <MailPreview mails={mails} onRead={onRead} />
        </article>
    )
}
