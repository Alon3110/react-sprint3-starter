
export function NotePreview({note}) {
const {info} = note
return (
<div className="note">
<h1>Title: {info.title}</h1>
<p>Text: {info.txt}</p>
</div>
    )
}