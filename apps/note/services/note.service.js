import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    // getDefaultFilter,
    // getFilterFromSearchParams
}

function query() {
    return storageService.query(NOTE_KEY)
}

// function query(filterBy = {}) {
//     return storageService.query(NOTE_KEY)
//         .then(notes => {
//             if (filterBy.txt) {
//                 const regExp = new RegExp(filterBy.txt, 'i')
//                 notes = notes.filter(note => regExp.test(note.type))
//             }
//             if (filterBy.title) {
//                 notes = notes.filter(note => note.title >= filterBy.title)
//             }
//             console.log(' notes:', notes)
//             return notes
//         })
// }

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
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

function getEmptyNote(type = '', title = '') {
    return { type, title }
}

// function getDefaultFilter() {
//     return { txt: '', title: '' }
// }

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = demoData
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}

// function _createNote(type, title = 250) {
//     const note = getEmptyNote(type, title)
//     note.id = utilService.makeId()
//     return note
// }

// function getFilterFromSearchParams(searchParams) {
//     const txt = searchParams.get('txt') || ''
//     const title = searchParams.get('title') || ''
//     return {
//         txt,
//         title
//     }
// }

// function _setNextPrevNoteId(note) {
//     return query().then((notes) => {
//         const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
//         const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
//         const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
//         note.nextNoteId = nextNote.id
//         note.prevNoteId = prevNote.id
//         return note
//     })
// }

const demoData = [
    {
        id: 'n101',
        createdAt: 1112222,
        type: 'NoteTxt',
        isPinned: true,
        style: {
            backgroundColor: '#00d'
        },
        info: {
            txt: 'Fullstack Me Baby!'
        }
    },
    {
        id: 'n102',
        createdAt: 1112223,
        type: 'NoteTxt',
        isPinned: false,
        info: {
            url: 'http://some-img/me',
            title: 'Bobi and Me'
        },
        style: {
            backgroundColor: '#00d'
        }
    },
    {
        id: 'n103',
        createdAt: 1112224,
        type: 'NoteTxt',
        isPinned: false,
        info: {
            title: 'Get my stuff together',
            todos: [
                { txt: 'Driving license', doneAt: null },
                { txt: 'Coding power', doneAt: 187111111 }
            ]
        }
    }
]

