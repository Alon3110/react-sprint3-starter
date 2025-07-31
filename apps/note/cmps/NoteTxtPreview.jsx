export function NoteTxtPreview({ note, onRemoveNote, setNoteColor }) {

    const { info } = note

    return (
        <div className="note">
            <h1>{info.title}</h1>
            <p>{info.txt}</p>
            {/* <button onClick={<NoteColor note={note} setNoteColor={setNoteColor} />}>Change color</button> */}
            <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    )
}