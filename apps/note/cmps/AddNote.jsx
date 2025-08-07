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

    // change handlers:

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

    function handleUrlChange({ target }) {
        const { name: field, value } = target
        const formattedUrl = noteService.getEmbedUrl(value)
        setNoteToEdit((prevNote) => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: formattedUrl }
        }))
    }

    // save functions:

        function onSaveNote(ev) {
        ev.preventDefault()
        if (!noteToEdit) return

        const noteToSave = { ...noteToEdit }
        noteToSave.createdAt = Date.now()

        onSave(noteToSave)
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        if (!noteToEdit) return

        const tasks = noteToEdit.split(',').map(txt => txt.trim()).filter(txt => txt)
        const todoToSave = noteService.getEmptyNote('NoteTodo')
        const todos = noteService.createTodo(tasks)
        todoToSave.info.todos = todos
        todoToSave.createdAt = Date.now()

        onSave(noteToSave)
    }

    function onSaveVideo(ev) {
        ev.preventDefault()
        if (!noteToEdit) return
        const emptyVideoNote = noteService.getEmptyNote('NoteVideo')
        const noteToSave = { ...emptyVideoNote, ...noteToEdit }
        // the next line is due to a type value bug:
        noteToSave.type = 'NoteVideo'
        noteToSave.createdAt = Date.now()

        onSave(noteToSave)
    }

    function onSave(noteToSave) {
        noteService.save(noteToSave)
            .then(savedNote => {
                setNotes(prevNotes => [savedNote, ...prevNotes])
                resetNote()
                setIsExpanded(false)
            })
            .catch(err => {
                console.log('Cannot save video note:', err)
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
                            <img src="assets/img/svgs/new-list.svg" alt="" className="btns-app" onClick={() => setNoteType('NoteTodo')} />
                            <img src="ssets/img/svgs/new-image.svg" alt="" className="btns-app" onClick={() => setNoteType('NoteVideo')} />
                            <button type="submit">Close</button>
                        </div>
                    )}
                </form>
            )}
            {noteType === 'NoteVideo'
                && isExpanded
                && (
                    <form onSubmit={onSaveVideo}>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title"
                            value={noteToEdit.info.title}
                            onChange={handleTxtChange}
                            className="note-title-input"
                        />
                        <input
                            type="url"
                            id="url"
                            name="url"
                            placeholder="Paste video URL"
                            value={noteToEdit.info.url || ''}
                            onChange={handleUrlChange}
                            className="note-url-input"
                        />
                        <div className="note-actions">
                            <img src="assets/img/svgs/new-image.svg" alt="" className="btns-app" onClick={() => setNoteType('NoteVideo')} />
                            <button type="submit">Close</button>
                        </div>
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
                        <button type="button" onClick={() => setNoteType('NoteTxt')}>Text Note</button>
                        <button type="submit">Close</button>
                    </div>
                </form>
            )}
        </section>
    )
}
