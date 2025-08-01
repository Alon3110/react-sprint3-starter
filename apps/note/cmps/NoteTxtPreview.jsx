import { NoteColor } from "../cmps/NoteColor.jsx"

const { useState } = React

export function NoteTxtPreview({ note, onRemoveNote, onSetNoteColor }) {

    const { info, id, style } = note
    const [isOpen, setIsOpen] = useState(false)

    function onToggleShowColorPicker() {
        setIsOpen(prev => !prev)
    }

    return (
        <div className="note" style={{ backgroundColor: style.backgroundColor }}>
            <h1>{info.title}</h1>
            <p>{info.txt}</p>
            <div className="btn-note-bar">
                <img src="../../assets/img/svgs/colors-black.svg" alt=""
                    className="btns-app"
                    onClick={onToggleShowColorPicker} />
                <img src="../../assets/img/svgs/delete.svg" alt="" className="btns-app" onClick={() => onRemoveNote(id)} />
                {isOpen && (
                    <NoteColor noteId={id} onSetNoteColor={onSetNoteColor} backgroundColor={style.backgroundColor} />
                )}
            </div>
        </div>
    )
}