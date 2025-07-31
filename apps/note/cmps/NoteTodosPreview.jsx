// import { NoteColor } from "../cmps/NoteColor.jsx"

// const { useState, useEffect } = React

export function NoteTodosPreview({ note, onRemoveNote, onSetNoteColor }) {

    const { info } = note
    // const [showColorPicker, setShowColorPicker] = useState(false)

    // function onToggleColorPicker() {

    // }

    return (
        <div className="note">
            <h1>{info.title}</h1>
            <ul className="todos-list">
                {info.todos.map(todo => {
                    return <li>
                        {todo.txt}
                    </li>
                })}
            </ul>
            <div className="btn-note-bar">
                <img src="../../assets/note-svgs/colors.svg" alt="" className="btns-app" onClick={() => onSetNoteColor(note.id, note.style.backgroundColor)} />
                <img src="../../assets/note-svgs/delete.svg" alt="" className="btns-app" onClick={() => onRemoveNote(note.id)} />
            </div>
        </div>
    )
}