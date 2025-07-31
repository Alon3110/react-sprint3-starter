export function NoteTxtPreview({ note, onRemoveNote }) {

    const { info } = note
    return (
        <div className="note">
            <h1>{info.title}</h1>
            <p>{info.txt}</p>
            <button onClick={() => onRemoveNote(note.id)}>X</button>
        </div>
    )
}