import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { demoData } from '../demoData.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    createTodo,
    getEmptyTodo,
    // getDefaultFilter,
    // getFilterFromSearchParams
}

function query() {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {    
    return storageService.get(NOTE_KEY, noteId)
    // return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type) {
    // add if for every note type
    if (type === 'NoteTxt') {
        return {
            type,
            isPinned: false,
            style: {
                backgroundColor: '#00d'
            },
            info: {
                title: '',
                txt: '',
            }
        }
    } else if (type === 'NoteTodo') {
        return ''
    }
}

function createTodo(tasks) {
    return tasks.map(task => {
        return { txt: task, doneAt: null }
    })
}

function getEmptyTodo() {
    return {
        type: 'NoteTodo',
        isPinned: false,
        info: {
            title: '',
            todos: [
            ]
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {
        notes = demoData
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

// NoteTodos

function _createTodo(txt) {
    return {
        id: makeId(),
        txt,
        isActive: true,
    }
}

