import { noteService } from "../services/note.service.js"

export function AddTodosNote({ handleChange, setNote }) {
   
    handleChange()
    function handleChange({ target }) {
        const { name: field, type } = target
        console.log(target);
        
        // const value = type = target.value
        // const value = type === 'number' ? +target.value : target.value
        // setNote((prevNote) => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
    }

    return (
        <h1>NoteTodos placeholder</h1>
        // todos.map(todo => `
        //     <li onclick="onToggleTodo('${todo.id}')" class="${todo.isActive ? '' : 'done'}">
        //     <span>${todo.txt}</span>
        //     <button onclick="onShowDetails(event, '${todo.id}')">Details</button>
        //     <button onclick="onRemoveTodo(event, '${todo.id}')">X</button>
        //     </li>
        //     `)
    )
}

// function onRemoveTodo(ev, todoId) {
//     ev.stopPropagation()
//     removeTodo(todoId)
//     renderTodos()
// }

// function onToggleTodo(todoId) {
//     toggleTodo(todoId)
//     renderTodos()
// }

// function addTodo(ev) {
//     ev.preventDefault()
// }