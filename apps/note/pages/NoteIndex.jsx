import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { AddTodosNote } from "../cmps/AddTodosNote.jsx"

const { useState, useEffect } = React
export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [noteToSave, setNote] = useState(noteService.getEmptyNote())
    const [cmpType, setCmpType] = useState('NoteTxt')

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get notes!')
            })
    }

    function addNote(ev) {
        ev.preventDefault()
        onSaveNote(noteToSave)
    }

    function handleChange({ target }) {
        const { name: field, type } = target
        const value = type === 'number' ? +target.value : target.value
        setNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    function onSaveNote(noteToSave) {
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

    if (!notes) return <div className="loader">Loading...</div>
    return (
        <section className="note-index">
            <form onSubmit={addNote} className="new-note-form">
                <div className='review-modal'>
                    <input
                        onChange={handleChange}
                        type='text'
                        id='title'
                        name='title'
                        size='10'
                        placeholder="Note Title"
                    />
                    <DynamicCmp cmpType={cmpType} handleChange={handleChange} />
                    <section style={{ marginTop: '10px' }} className="container">
                    </section>
                    <button>Save</button>
                </div>
            </form>
            <NoteList notes={notes} />
        </section>
    )
}

function DynamicCmp(props) {
    const dynamicCmpMap = {
        NoteTxt: <AddNote {...props} />,
        NoteTodos: <AddTodosNote {...props} />,
    }
    return dynamicCmpMap[props.cmpType]
}
