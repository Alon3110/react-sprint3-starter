
const { useState, useRef, useEffect } = react

export function FloatingNoteBar({ onAddNote }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [note, setNote] = useState({ title: '', txt: '' })

  const wrapperRef = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsExpanded(false)
        setNote({ title: '', txt: '' })
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleChange(ev) {
    const { name, value } = ev.target
    setNote(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!note.txt.trim() && !note.title.trim()) return
    if (onAddNote) onAddNote(note)
    setNote({ title: '', txt: '' })
    setIsExpanded(false)
  }

  return (
    <div className="floating-note-bar" ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        {isExpanded && (
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Title"
            className="note-title-input"
          />
        )}
        <textarea
          name="txt"
          value={note.txt}
          onChange={handleChange}
          onClick={() => setIsExpanded(true)}
          placeholder="Take a note..."
          className="note-textarea"
          rows={isExpanded ? 3 : 1}
        />
        {isExpanded && (
          <div className="note-actions">
            <button type="submit">Save</button>
          </div>
        )}
      </form>
    </div>
  )
}