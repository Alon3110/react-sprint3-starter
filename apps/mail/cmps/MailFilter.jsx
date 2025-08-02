const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailFilter({ defaultFilter, handleSetFilter, toggleMenu, sortBy, onUpdate }) {
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        handleSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prev => ({ ...prev, [field]: value }))
    }

    function handleSort({ target }) {
        const { name, value } = target
        onUpdate(prev => ({
            ...prev,
            [name]: name === 'sortDir' ? +value : value
        }))
    }

    const { subject } = filterByToEdit

    return (
        <section className="main-filter">
            <button className="btn-toggle-menu" type="button" onClick={toggleMenu}>☰</button>

            <form className="search-bar">
                <label htmlFor="subject"></label>
                <input onChange={handleChange}
                    name="subject"
                    value={subject}
                    id="subject"
                    type="text"
                    placeholder="Search mail"
                />

                <select
                    name="sortField"
                    value={sortBy.sortField}
                    onChange={handleSort}
                    className="sort-field"
                >
                    <option value="date">Date</option>
                    <option value="title">Title (A→Z)</option>
                </select>

                <label>
                    <input
                        type="radio"
                        name="sortDir"
                        value="1"
                        checked={sortBy.sortDir === 1}
                        onChange={handleSort}
                    />
                </label>

                <label>
                    <input
                        type="radio"
                        name="sortDir"
                        value="-1"
                        checked={sortBy.sortDir === -1}
                        onChange={handleSort}
                    />
                </label>
            </form>
        </section>
    )
}
