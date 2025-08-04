import { utilService } from "../../../services/util.service.js"
import { noteService } from "../services/note.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, useRef } = React

export function NoteFilter({ setNotes, onToggleSearch }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ txt: '' })
    const searchNotesDebounce = useRef(utilService.debounce(searchNotes, 500)).current
    const { txt } = filterByToEdit
    const wrapperRef = useRef()

    useEffect(() => {
        searchNotesDebounce(filterByToEdit)
    }, [filterByToEdit])

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                onToggleSearch()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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
        <section className="search-note-txt" ref={wrapperRef}>
            <form onSubmit={(ev) => ev.preventDefault()}>
                <label htmlFor="txt"></label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" placeholder="Search" className="search-bar" />
            </form>
        </section>
    )
}
