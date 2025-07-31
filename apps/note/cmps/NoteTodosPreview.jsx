export function NoteTodosPreview({ note }) {

    const { info } = note
    console.log(info);
    
    return (
        <div className="note">
        <h1>{info.title}</h1>
        <ul className="todos-list">
        {info.todos.map(todo => {
            return <li>
            {todo.txt}
        </li>
    })}
    </ul>
    </div>
    )
}

// export function NoteTodosPreview({ note }) {

//     const { info } = note
    
//     return (note.info.todos.map(todo => {
//         return <div>
//             {todo.txt}
//         </div>
//     })
//     )
// }