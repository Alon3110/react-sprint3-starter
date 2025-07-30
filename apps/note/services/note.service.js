import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import {demoData} from '../demoData.js'

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

function _createNotes() {
    
    let notes = utilService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = demoData        
        utilService.saveToStorage(NOTE_KEY, notes)
    }
}



