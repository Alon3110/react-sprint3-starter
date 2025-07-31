import { NoteTxtPreview } from "./NoteTxtPreview.jsx"
import { NoteTodosPreview } from "./NoteTodosPreview.jsx"

export function NoteList({ notes }) {

    if (!notes) return <div className="loader">Loading...</div>
    return (<section className="notes-container">
        {notes.map(note => (
            <div key={note.id}>
                <DynamicCmp note={note} />
            </div>
        ))}
        {/* <button className="btn-add-note" onClick={toggleAddNote}>+</button> */}
    </section>)
}

function DynamicCmp(props) {
    const dynamicCmpMap = {
        NoteTxt: <NoteTxtPreview {...props} />,
        NoteTodo: <NoteTodosPreview {...props} />,
    }
    return dynamicCmpMap[props.note.type]
}