export function NoteColor({setNoteColor, backgroundColor }) {

    console.log('backgroundColor:', backgroundColor)
    const colors = [
        '#F44236',
        '#9C27B0',
        '#3F51B5',
        '#2196F3',
        '#4caf50',
        '#101010',
    ]

    function onSetColor(color) {
        setNoteColor({ backgroundColor: color })
    }

    return (
        <section className="color-input">
            {colors.map(color => (
                <div
                    className={`item ${color === backgroundColor ? 'chosen' : ''}`}
                    key={color}
                    style={{ backgroundColor: color }}
                    onClick={() => onSetColor(color)}
                >
                </div>
            ))}
        </section >
    )
}