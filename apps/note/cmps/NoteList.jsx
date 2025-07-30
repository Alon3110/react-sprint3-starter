import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes }) {

    if (!notes) return <div className="loader">Loading...</div>
    return (<section className="notes-container">
            {notes.map(note => (
                <div key={note.id}>
                    <NotePreview note={note} />
                </div>
            ))}
            {/* <button className="btn-add-note" onClick={toggleAddNote}>+</button> */}
        </section>)
}
