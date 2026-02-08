// One-off script to reset Firestore analytics counters and clear events.
// Run with: node scripts/reset-analytics.mjs

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'

const app = initializeApp({
  apiKey: "AIzaSyA2SHfvTWAp3jVGXHe01v4DU_phv-eyW-E",
  authDomain: "sarveshminacom.firebaseapp.com",
  projectId: "sarveshminacom",
  storageBucket: "sarveshminacom.firebasestorage.app",
  messagingSenderId: "244816636048",
  appId: "1:244816636048:web:ffe6f52d49785a1a3b5015",
  measurementId: "G-F3J525LNJF",
})

const db = getFirestore(app)

// Reset counters
console.log('Resetting counters...')
await setDoc(doc(db, 'analytics', 'counters'), {
  pageViews: 0,
  uniqueVisitors: 0,
  sections: {},
  projectActions: {},
})
console.log('Counters reset to zero.')

// Delete all events
console.log('Deleting events...')
const eventsSnap = await getDocs(collection(db, 'analytics_events'))
let count = 0
for (const d of eventsSnap.docs) {
  await deleteDoc(d.ref)
  count++
}
console.log(`Deleted ${count} events.`)

console.log('Done! Analytics reset to zero.')
process.exit(0)
