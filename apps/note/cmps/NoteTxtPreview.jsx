import { NoteColor } from "../cmps/NoteColor.jsx"

export function NoteTxtPreview({ note, onRemoveNote, onSetNoteColor }) {

    const { info, id, style } = note

    return (
        <div className="note" style={{ backgroundColor: style.backgroundColor }}>
            <h1>{info.title}</h1>
            <p>{info.txt}</p>
            <div className="btn-note-bar">
                <img src="../../assets/img/svgs/colors-black.svg" alt="" className="btns-app" onClick={() => onSetNoteColor(id, style.backgroundColor)} />
                <img src="../../assets/img/svgs/delete.svg" alt="" className="btns-app" onClick={() => onRemoveNote(id)} />
                <NoteColor noteId={id} onSetNoteColor={onSetNoteColor} backgroundColor={style.backgroundColor} />
            </div>
        </div>
    )
}