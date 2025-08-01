export function NoteColor({ noteId, onSetNoteColor, backgroundColor }) {

    const colors = [
        'transparent',
        '#faafa8',
        '#f39f76',
        '#fff8b8',
        '#e2f6d3',
        '#b4ddd3',
        '#d4e4ed',
        '#aeccdc',
        '#d3bfdb',
        '#f6e2dd',
        '#efeff1',
    ]

    function handleSetColor(noteId, color) {
        onSetNoteColor(noteId, color)
    }

    return (
        <section className="color-input">
            {colors.map(color => (
                <div
                    className={`item ${color === backgroundColor ? 'chosen' : ''}`}
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSetColor(noteId, color)}
                >
                </div>
            ))}
        </section >
    )
}