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
    getEmbedUrl,
}

// function query() {
//     return storageService.query(NOTE_KEY)
// }

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note =>
                    regex.test(note.info.title || '') ||
                    regex.test(note.info.txt || '') ||
                    (note.info.todos && note.info.todos.some(todo => regex.test(todo.txt)))
                )
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
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
    if (type === 'NoteTxt') {
        return {
            type,
            isPinned: false,
            style: {
                backgroundColor: 'transparent'
            },
            info: {
                title: '',
                txt: '',
            }
        }
    } else if (type === 'NoteTodo') {
        return {
            type,
            isPinned: false,
            style: {
                backgroundColor: 'transparent'
            },
            info: {
                title: '',
                txt: '',
                todos: []
            }
        }
    } else if (type === 'NoteVideo') {
                return {
            type,
            isPinned: false,
            style: {
                backgroundColor: 'transparent'
            },
            info: {
                title: '',
                txt: '',
                url: '',
            }
        }
    } else if (type === 'NoteImage') {
                return {
            type,
            isPinned: false,
            style: {
                backgroundColor: 'transparent'
            },
            info: {
                title: '',
                txt: '',
                src: '',
            }
        }
    }
}

function createTodo(tasks) {
    return tasks.map(task => {
        return { txt: task, doneAt: null }
    })
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {
        notes = demoData
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

function getEmbedUrl(url) {
  if (!url) return ''
  const youtubeMatch = url.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }
  return url
}
