import { NoteColor } from "../cmps/NoteColor.jsx"

// const { useState } = React

export function NoteTodosPreview({ note, onRemoveNote, onSetNoteColor }) {

    const { info, id, style } = note
    // const [showColorPicker, setShowColorPicker] = useState(false)

    return (
            <div className="note" style={{ backgroundColor: style.backgroundColor }}>
            <h1>{info.title}</h1>
            <ul className="todos-list">
                {info.todos.map(todo => {
                    return <li>
                        {todo.txt}
                    </li>
                })}
            </ul>
            <div className="btn-note-bar">
                <NoteColor noteId={id} onSetNoteColor={onSetNoteColor} backgroundColor={style.backgroundColor} />
                <img src="../../assets/img/svgs/colors-black.svg" alt="" className="btns-app" onClick={() => onSetNoteColor(id, style.backgroundColor)} />
                <img src="../../assets/img/svgs/delete.svg" alt="" className="btns-app" onClick={() => onRemoveNote(id)} />
            </div>
        </div>
    )
}