import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { utilService } from "../../../services/util.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function NoteIndex() {
    
    const [notes, setNotes] = useState(null)
    // const [searchParams, setSearchParams] = useSearchParams()
    // const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        loadNotes()
    }, [])

    // useEffect(() => {
    //     setSearchParams(utilService.getTruthyValues(filterBy))
    //     loadNotes()
    // }, [filterBy])

    function loadNotes() {
        noteService.query()
            .then(notes => setNotes(notes))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get notes!')
            })
    }
    // function loadNotes() {
    //     noteService.query(filterBy)
    //         .then(notes => setNotes(notes))
    //         .catch(err => {
    //             console.log('err:', err)
    //             showErrorMsg('Cannot get notes!')
    //         })
    // }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes((prevNotes) => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note (${noteId}) removed successfully!`)
            })
            .catch(err => {
                console.log('Problem removing note:', err)
                showErrorMsg('Problem removing note!')
            })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy({ ...filterByToEdit })
    }

    if (!notes) return <div className="loader">Loading...</div>
    return (
        <section className="note-index">
            <section style={{ marginTop: '10px' }} className="container">
                <Link to="/note/edit">Add Note</Link>
            </section>
            <NoteList notes={notes} />
        </section>
    )
}
