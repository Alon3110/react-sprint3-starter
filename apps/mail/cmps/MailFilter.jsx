const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailFilter({ defaultFilter, handleSetFilter, toggleMenu }) {
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    useEffect(() => {
        handleSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prev => ({ ...prev, [field]: value }))
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
            </form>
        </section>
    )
}
