import { noteService } from "../services/note.service.js"

const { useState } = React

export function AddNote({ setNotes }) {

    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('NoteTxt'))
    const [noteType, setNoteType] = useState('NoteTxt')

    function handleTxtChange({ target }) {
        const { name: field, type } = target
        const value = type === 'number' ? +target.value : target.value
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function handleTodoChange({ target }) {
        const { name: field, type } = target
        const value = type === 'number' ? +target.value : target.value
        setNoteToEdit(value)
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        let tasks = noteToEdit.split(',')
        let todos = noteService.createTodo(tasks)
        let noteToSave = noteService.getEmptyTodo()
        noteToSave.info.todos = todos
        saveToDo(noteToSave)
    }

        function saveToDo(todoToSave) {
        todoToSave.createdAt = Date.now()
        noteService.save(todoToSave)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
            })
            .catch(err => {
                console.log('Cannot save note!:', err)
                showErrorMsg('Cannot save note!')
            })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        const noteToSave = { ...noteToEdit }
        noteToSave.createdAt = Date.now()
        noteService.save(noteToSave)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
            })
            .catch(err => {
                console.log('Cannot save note!:', err)
                showErrorMsg('Cannot save note!')
            })
    }

    return (
        <section>

            {noteType === 'NoteTxt' && <form onSubmit={onSaveNote} className="new-note-form">
                <div>
                    <input
                        onChange={handleTxtChange}
                        // onFocus={() => setIsFocused(true)}
                        type='text'
                        id='title'
                        name='title'
                        size='10'
                        placeholder="Enter Title"
                    />
                    <input
                        onChange={handleTxtChange}
                        // onFocus={() => setIsFocused(true)}
                        type='text'
                        id='txt'
                        name='txt'
                        size='10'
                        placeholder="Enter text here"
                    />
                    <button>Save</button>
                </div>
            </form>}
            {noteType === 'NoteTodo' && <form onSubmit={onSaveTodo} className="new-note-form">
                <div>
                    <input
                        onChange={handleTodoChange}
                        // onFocus={() => setIsFocused(true)}
                        type='text'
                        id='title'
                        name='title'
                        size='10'
                        placeholder="Enter Title"
                    />
                    <input
                        onChange={handleTodoChange}
                        // onFocus={() => setIsFocused(true)}
                        type='text'
                        id='txt'
                        name='txt'
                        size='10'
                        placeholder="Enter tasks separated by commas"
                    />
                    <button>Save</button>
                </div>
            </form>}
            <button onClick={() => setNoteType('NoteTodo')}>AddTodo</button>
        </section>
    )

}