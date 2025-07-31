const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailFilter({ defaultFilter, handleSetFilter }) {
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
    console.log(subject);

    return (
        <form>
            <label htmlFor="subject"></label>
            <input onChange={handleChange}
                name="subject"
                value={subject}
                id="subject"
                type="text"
                placeholder="Search mail"
            />
        </form>
    )
}
