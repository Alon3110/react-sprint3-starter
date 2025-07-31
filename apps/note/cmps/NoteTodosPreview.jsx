export function NoteTodosPreview({ note, onRemoveNote, setNoteColor }) {

    const { info } = note

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
            {/* <button onClick={<NoteColor />}>Change color</button> */}
            <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    )
}