import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"

const { useState, useEffect, useRef } = React

export function NoteFilter({ setNotes }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ txt: '' })
    const searchNotesDebounce = useRef(utilService.debounce(searchNotes, 500)).current
    const { txt } = filterByToEdit

    useEffect(() => {
        searchNotesDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function searchNotes(filterBy) {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('Error searching note:', err)
                showErrorMsg('Error searching note!')
            })
    }

    return (
        <section className="search-note-txt">
            <form>
                <label htmlFor="txt">Search notes by text</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />
            </form>
        </section>
    )
}
