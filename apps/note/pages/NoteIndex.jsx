import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/AddNote.jsx"

const { useState, useEffect } = React
export function NoteIndex() {

    const [notes, setNotes] = useState(null)
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

    function onSaveNote(noteToSave) {
        noteService.createdAt = Date.now()
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
            <DynamicCmp cmpType={cmpType} onSaveNote={onSaveNote}/>
            <section style={{ marginTop: '10px' }} className="container">
            </section>
            <NoteList notes={notes} />
        </section>
    )
}

function DynamicCmp(props) {
    const dynamicCmpMap = {
        NoteTxt: <AddNote {...props} />
    }
    return dynamicCmpMap[props.cmpType]
}
