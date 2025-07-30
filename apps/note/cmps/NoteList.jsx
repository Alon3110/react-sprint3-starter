import { NotePreview } from "../cmps/NotePreview.jsx"


export function NoteList({ notes }) {

    if (!notes) return <div className="loader">Loading...</div>
    return <section>
        {notes.map(note => (
    <div key={note.id} className="notes-container">
        <NotePreview note={note} />
    </div>
))}
    </section>
}
