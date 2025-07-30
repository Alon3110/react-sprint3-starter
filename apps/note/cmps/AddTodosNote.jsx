

function renderTodos() {
    const todos = getTodos()
    var strHTMLs = todos.map(todo => `
        <li onclick="onToggleTodo('${todo.id}')" class="${todo.isActive ? '' : 'done'}">
            <span>${todo.txt}</span>
            <button onclick="onShowDetails(event, '${todo.id}')">Details</button>
            <button onclick="onRemoveTodo(event, '${todo.id}')">X</button>
        </li>
    `)
    renderStats()
    elTodoList.innerHTML = strHTMLs.join('')
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    removeTodo(todoId)
    renderTodos()
}


function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    addTodo()
}

function onShowDetails(ev, todoId) {
    ev.stopPropagation()
    // elContent.innerHTML = JSON.stringify(todo, null, 4)
}