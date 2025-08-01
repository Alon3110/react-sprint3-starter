import { debounce } from "../../../services/util.service"

const { useState, useEffect, useRef } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        isPinned ? setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value })) : target
    }


    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="note-filter container">
            <h2>Filter Our Notes</h2>
            <form>
                <label htmlFor="txt">Vendor</label>
                <input onChange={handleChange} value={txt} name="txt" id="txt" type="text" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input onChange={handleChange} value={minSpeed || ''} name="minSpeed" id="minSpeed" type="number" />
            </form>
        </section>
    )
}