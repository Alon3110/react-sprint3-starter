export function AddMail({ onSubmit, mail, handleChange }) {

    function handleSubmit(ev) {
        ev.preventDefault()
        const { to, subject, body } = ev.target.elements

        const mail = {
            to: to.value,
            subject: subject.value,
            body: body.value,
            sentAt: Date.now(),
            isRead: false,
            from: 'user@appsus.com'
        }
        onSubmit(mail)
    }    

    return (
        <form onSubmit={handleSubmit}>
            <input name="to" placeholder="To" required />
            <input name="subject" placeholder="Subject" required />
            <textarea name="body" placeholder="Body" ></textarea>
            <button className="save-mail-btn" type="submit">Send</button>
        </form>
    )
}
