export function NoteTxtPreview({ note, onRemoveNote, onSetNoteColor }) {

    const { info } = note

    return (
        <div className="note" style={{backgroundColor: note.style.backgroundColor}}>
            <h1>{info.title}</h1>
            <p>{info.txt}</p>
            <button onClick={() => onSetNoteColor(note.id, note.style.backgroundColor)}>Change color</button>
            <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    )
}