import { db } from '../firebase'
import {
  doc, setDoc, getDoc, updateDoc, increment,
  collection, addDoc, query, orderBy, limit, getDocs, serverTimestamp,
} from 'firebase/firestore'

const COUNTERS_DOC = doc(db, 'analytics', 'counters')
const EVENTS_COL = collection(db, 'analytics_events')

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

async function ensureCountersDoc() {
  const snap = await getDoc(COUNTERS_DOC)
  if (!snap.exists()) {
    await setDoc(COUNTERS_DOC, {
      pageViews: 0,
      uniqueVisitors: 0,
      sections: {},
      projectActions: {},
    })
  }
}

let countersReady = null
function initCounters() {
  if (!countersReady) countersReady = ensureCountersDoc()
  return countersReady
}

async function incrementCounter(field, amount = 1) {
  try {
    await initCounters()
    await updateDoc(COUNTERS_DOC, { [field]: increment(amount) })
  } catch (e) {
    console.warn('Analytics: increment failed', e)
  }
}

async function logEvent(type, data = {}) {
  try {
    await addDoc(EVENTS_COL, {
      type,
      ...data,
      sessionId: getSessionId(),
      timestamp: serverTimestamp(),
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
  await initCounters()
  const snap = await getDoc(COUNTERS_DOC)
  return snap.exists() ? snap.data() : { pageViews: 0, uniqueVisitors: 0, sections: {}, projectActions: {} }
}

export async function getRecentEvents(count = 50) {
  const q = query(EVENTS_COL, orderBy('timestamp', 'desc'), limit(count))
  const snap = await getDocs(q)
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
