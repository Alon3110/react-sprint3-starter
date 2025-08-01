import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/AddNote.jsx"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)

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

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note removed successfully!`)
            })
            .catch(err => {
                console.log('Error deleting note:', err)
                showErrorMsg('Error deleting note!')
            })
    }

    function onSetNoteColor(noteId, color) {

        noteService.get(noteId)
            .then(note => {
                const updatedNote = {
                    ...note, style: {
                        ...note.style, backgroundColor: color
                    }
                }
                return noteService.save(updatedNote)
            })
            .then(savedNote => {
                setNotes(prevNotes =>
                    prevNotes.map(note =>
                        note.id === savedNote.id ? savedNote : note
                    )
                )
            })
            .catch(err => {
                console.log('Error changing color:', err)
                showErrorMsg('Error changing color!')
            })
    }



    if (!notes) return <div className="loader">Loading...</div>
    return (
        <section className="note-index">
            <AddNote setNotes={setNotes} />
            <NoteList notes={notes} onRemoveNote={onRemoveNote} onSetNoteColor={onSetNoteColor} />
        </section>
    )
}