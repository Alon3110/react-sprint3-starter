import { NoteTxtPreview } from "./NoteTxtPreview.jsx"
import { NoteTodosPreview } from "./NoteTodosPreview.jsx"
import { NoteVideoPreview } from "./NoteVideoPreview.jsx"
import { NoteImagePreview } from "./NoteImagePreview.jsx"

export function NoteList({ notes, onRemoveNote, onSetNoteColor }) {
   
    if (!notes.length) return <div className="loader note-loader">No notes were found</div>
    if (!notes) return <div className="loader note-loader">Loading...</div>
    return (<section className="notes-container">
        {notes.map(note => (
            <div key={note.id}>
                <DynamicCmp note={note} onRemoveNote={onRemoveNote} onSetNoteColor={onSetNoteColor} />
            </div>
        ))}
    </section>)
}

function DynamicCmp(props) {
    const dynamicCmpMap = {
        NoteTxt: <NoteTxtPreview {...props} />,
        NoteTodo: <NoteTodosPreview {...props} />,
        NoteVideo: <NoteVideoPreview {...props} />,
        NoteImage: <NoteImagePreview {...props} />,
    }
    return dynamicCmpMap[props.note.type]
}