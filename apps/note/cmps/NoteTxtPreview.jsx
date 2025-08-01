export function NoteTxtPreview({ note, onRemoveNote, onSetNoteColor }) {

    const { info } = note

    return (
        <div className="note" style={{ backgroundColor: note.style.backgroundColor }}>
            <h1>{info.title}</h1>
            <p>{info.txt}</p>
            <div className="btn-note-bar">
                <img src="../../assets/img/svgs/colors-black.svg" alt="" className="btns-app" onClick={() => onSetNoteColor(note.id, note.style.backgroundColor)} />
                <img src="../../assets/img/svgs/delete.svg" alt="" className="btns-app" onClick={() => onRemoveNote(note.id)} />
            </div>
        </div>
    )
}