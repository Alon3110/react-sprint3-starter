import { NoteColor } from "../cmps/NoteColor.jsx"

const { useState, useEffect } = React

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
            {/* <NoteColor onSetNoteColor={onSetNoteColor(note.id, note.style.backgroundColor)} /> */}
            {/* <button onClick={() => onToggleColorPicker()}>Change color</button> */}
            <button onClick={() => onSetNoteColor(note.id, note.style.backgroundColor)}>Change color</button>
            <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    )
}