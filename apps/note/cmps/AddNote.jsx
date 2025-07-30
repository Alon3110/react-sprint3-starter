import { noteService } from "../services/note.service.js"

const { useState } = React

export function AddNote({ onSaveNote }) {

    const [noteToSave, setNote] = useState(noteService.getEmptyNote())

    function addNote(ev) {
        ev.preventDefault()
        onSaveNote(noteToSave)
    }

    function handleChange({ target }) {
        const { name: field, type } = target
        const value = type === 'number' ? +target.value : target.value
        setNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    if (!noteToSave) return <div className="loader">Loading...</div>
    return (
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
                <textarea
                    name='txt'
                    cols='30'
                    rows='10'
                    onChange={handleChange}
                    placeholder="Enter text here"
                ></textarea>
                <button>Save</button>
            </div>
        </form>
    )
}