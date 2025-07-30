import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails }) {
    
    return (
        <article>
            <h1>{mails.to}</h1>
            <MailPreview mails= {mails}/>
        </article>
    )
}
