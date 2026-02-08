import { db } from '#firebase-config'

let firestoreReady = null
let fs = {}

function loadFirestore() {
  if (!db) return Promise.resolve()
  if (!firestoreReady) {
    firestoreReady = import('firebase/firestore').then(mod => { fs = mod })
  }
  return firestoreReady
}

function getSessionId() {
  let id = sessionStorage.getItem('analytics_session')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('analytics_session', id)
  }
  return id
}

function isNewVisitor() {
  const key = 'analytics_visitor_id'
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, Math.random().toString(36).slice(2))
    return true
  }
  return false
}

let countersReady = null

async function ensureCountersDoc() {
  if (!db) return
  await loadFirestore()
  const countersDoc = fs.doc(db, 'analytics', 'counters')
  const snap = await fs.getDoc(countersDoc)
  if (!snap.exists()) {
    await fs.setDoc(countersDoc, {
      pageViews: 0,
      uniqueVisitors: 0,
      sections: {},
      projectActions: {},
    })
  }
}

function initCounters() {
  if (!countersReady) countersReady = ensureCountersDoc()
  return countersReady
}

async function incrementCounter(field, amount = 1) {
  if (!db) return
  try {
    await loadFirestore()
    await initCounters()
    const countersDoc = fs.doc(db, 'analytics', 'counters')
    await fs.updateDoc(countersDoc, { [field]: fs.increment(amount) })
  } catch (e) {
    console.warn('Analytics: increment failed', e)
  }
}

async function logEvent(type, data = {}) {
  if (!db) return
  try {
    await loadFirestore()
    const eventsCol = fs.collection(db, 'analytics_events')
    await fs.addDoc(eventsCol, {
      type,
      ...data,
      sessionId: getSessionId(),
      timestamp: fs.serverTimestamp(),
    })
  } catch (e) {
    console.warn('Analytics: event log failed', e)
  }
}

// --- Public tracking functions ---

export async function trackPageView() {
  incrementCounter('pageViews')
  if (isNewVisitor()) {
    incrementCounter('uniqueVisitors')
  }
  logEvent('page_view')
}

export async function trackSectionView(sectionName) {
  incrementCounter(`sections.${sectionName}`)
  logEvent('section_view', { section: sectionName })
}

export async function trackProjectAction(slug, action) {
  incrementCounter(`projectActions.${slug}_${action}`)
  logEvent('project_action', { project: slug, action })
}

// --- Dashboard data fetchers ---

export async function getCounters() {
  if (!db) return { pageViews: 0, uniqueVisitors: 0, sections: {}, projectActions: {} }
  await loadFirestore()
  await initCounters()
  const countersDoc = fs.doc(db, 'analytics', 'counters')
  const snap = await fs.getDoc(countersDoc)
  return snap.exists() ? snap.data() : { pageViews: 0, uniqueVisitors: 0, sections: {}, projectActions: {} }
}

export async function getRecentEvents(count = 50) {
  if (!db) return []
  await loadFirestore()
  const eventsCol = fs.collection(db, 'analytics_events')
  const q = fs.query(eventsCol, fs.orderBy('timestamp', 'desc'), fs.limit(count))
  const snap = await fs.getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// --- Section observer for automatic tracking ---

const trackedSections = new Set()

export function createSectionObserver() {
  if (typeof IntersectionObserver === 'undefined') return null

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        if (id && !trackedSections.has(id)) {
          trackedSections.add(id)
          trackSectionView(id)
        }
      }
    })
  }, { threshold: 0.3 })
}
