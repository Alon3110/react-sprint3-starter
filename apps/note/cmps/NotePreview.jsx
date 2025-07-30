
export function NotePreview({note}) {
const {info} = note
return (
<div className="note">
<h1>{info.title}</h1>
<p>{info.txt}</p>
</div>
    )
}