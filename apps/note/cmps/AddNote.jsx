import { noteService } from "../services/note.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React

export function AddNote({ setNotes }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote('NoteTxt'))
    const [noteType, setNoteType] = useState('NoteTxt')
    const [isExpanded, setIsExpanded] = useState(false)
    const wrapperRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsExpanded(false)
                resetNote()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function resetNote() {
        setNoteToEdit(noteService.getEmptyNote(noteType))
    }

    function handleTxtChange({ target }) {
        const { name: field, type } = target
        const value = type === 'number' ? +target.value : target.value
        setNoteToEdit((prevNote) => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: value }
        }))
    }

    function handleTodoChange({ target }) {
        const value = target.value
        setNoteToEdit(value)
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        if (!noteToEdit) return
        const tasks = noteToEdit.split(',').map(txt => txt.trim()).filter(txt => txt)
        const todos = noteService.createTodo(tasks)
        const todoToSave = noteService.getEmptyTodo()
        todoToSave.info.todos = todos
        todoToSave.createdAt = Date.now()

        noteService.save(todoToSave)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                resetNote()
                setIsExpanded(false)
            })
            .catch(err => {
                console.log('Cannot save todo note:', err)
                showErrorMsg('Cannot save note!')
            })
    }

    function onSaveNote(ev) {
        ev.preventDefault()
        const noteToSave = { ...noteToEdit }
        noteToSave.createdAt = Date.now()

        noteService.save(noteToSave)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                resetNote()
                setIsExpanded(false)
            })
            .catch(err => {
                console.log('Cannot save note:', err)
                showErrorMsg('Cannot save note!')
            })
    }

    return (
        <section
            ref={wrapperRef}
            className={`floating-note-bar ${isExpanded ? 'expanded' : 'collapsed'}`}
        >
            {noteType === 'NoteTxt' && (
                <form onSubmit={onSaveNote}>
                    {isExpanded && (
                        <input
                            onChange={handleTxtChange}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={noteToEdit.info.title}
                            className="note-title-input"
                        />
                    )}
                    <textarea
                        onClick={() => setIsExpanded(true)}
                        onChange={handleTxtChange}
                        id="txt"
                        name="txt"
                        placeholder="Take a note..."
                        value={noteToEdit.info.txt}
                        className="note-textarea"
                        rows={isExpanded ? 3 : 1}
                    />
                    {isExpanded && (
                        <div className="note-actions">
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setNoteType('NoteTodo')}>+ Todo</button>
                        </div>
                    )}
                </form>
            )}

            {noteType === 'NoteTodo' && isExpanded && (
                <form onSubmit={onSaveTodo}>
                    <input
                        onChange={handleTodoChange}
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Todo list: task1, task2..."
                        className="note-textarea"
                    />
                    <div className="note-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setNoteType('NoteTxt')}>← Back</button>
                    </div>
                </form>
            )}
        </section>
    )
}
