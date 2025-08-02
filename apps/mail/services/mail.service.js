import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js'
import { demoData } from '../demoData.js'

const MAIL_KEY = 'mailDB'
const CACHE_STORAGE_KEY = 'googlemailsCache'
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}

_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    addReview,
    _setNextprevMailId,
    getFilterFromSearchParams,
    sortBy
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
    .then(mails => {
        if (filterBy.subject) {
            const regExp = new RegExp(filterBy.subject, 'i')
            mails = mails.filter(mail => regExp.test(mail.subject))
        }
        if (filterBy.price) {
            mails = mails.filter(mail => mail.listPrice.amount >= +filterBy.price)
        }
        return mails
    })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  const savedMail = mail.id ? storageService.put(MAIL_KEY, mail)
                     : storageService.post(MAIL_KEY, mail)

  return savedMail.then(savedMail => {
    return storageService.query(MAIL_KEY).then(allMails => {
      utilService.saveToStorage(MAIL_KEY, allMails)         
      return savedMail                                
    })
  })
}

function addReview(mailId, review) {
    return get(mailId)
        .then(mail => {
            if (!mail.reviews) mail.reviews = []
            mail.reviews.push({ ...review, id: utilService.utilService.makeId(), createdAt: Date.now() })
            return save(mail)
        })
}

function _setNextprevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function getEmptyMail() {
    return {
        id: Date.now(),
        to: '',
        subject: '',
        body: '',
        isRead: false,
        sentAt: null,
    }
}

function _loadMails() {
return utilService.loadFromStorage(MAIL_KEY) || []
}

function sortBy({ txt = '', sortField = 'date', sortDir = -1 } = {}) {
  let mails = _loadMails()          

  if (txt) {
    const re = new RegExp(txt, 'i')
    mails = mails.filter(m => re.test(m.subject) || re.test(m.body))
  }

  if (sortField === 'title') {
    mails.sort((a, b) => a.subject.localeCompare(b.subject) * sortDir)
  } else if (sortField === 'date') {
    mails.sort((a, b) => (a.sentAt - b.sentAt) * sortDir) // sentAt = timestamp/Date
  }

  return Promise.resolve(mails)
}


function getDefaultFilter(filterBy = { subject: '', body: '', from: '', to: ''}) {
    return { subject: filterBy.subject, body: filterBy.body, from: filterBy.from, to: filterBy.to}
}

function getFilterFromSearchParams(searchParams) {
    const isRead = searchParams.get('read') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        isRead,
        minSpeed
    }
}

function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY) || []
    if (!mails || !mails.length) {
        mails = demoData
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}