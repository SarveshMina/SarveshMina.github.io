import {
  defaultProjects,
  defaultSkills,
  defaultEducation,
  defaultExperience,
} from '../data/defaults'

const STORAGE_KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  education: 'portfolio_education',
  experience: 'portfolio_experience',
}

function getWithFallback(key, defaults) {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(defaults) ? Array.isArray(parsed) : typeof parsed === 'object') {
        return parsed
      }
    }
  } catch (e) {
    console.warn(`Failed to parse localStorage key "${key}":`, e)
  }
  return JSON.parse(JSON.stringify(defaults))
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function ensureFields(items) {
  return items.map((item, i) => ({
    active: true,
    order: i,
    ...item,
  }))
}

function activeAndSorted(items) {
  return ensureFields(items)
    .filter(item => item.active !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
}

// Public getters — filtered (active only) and sorted by order
export function getProjects() { return activeAndSorted(getWithFallback(STORAGE_KEYS.projects, defaultProjects)) }
export function getSkills() { return getWithFallback(STORAGE_KEYS.skills, defaultSkills) }
export function getEducation() { return activeAndSorted(getWithFallback(STORAGE_KEYS.education, defaultEducation)) }
export function getExperience() { return activeAndSorted(getWithFallback(STORAGE_KEYS.experience, defaultExperience)) }

// Admin getters — all items with active/order fields ensured
export function getAllProjects() { return ensureFields(getWithFallback(STORAGE_KEYS.projects, defaultProjects)).sort((a, b) => a.order - b.order) }
export function getAllEducation() { return ensureFields(getWithFallback(STORAGE_KEYS.education, defaultEducation)).sort((a, b) => a.order - b.order) }
export function getAllExperience() { return ensureFields(getWithFallback(STORAGE_KEYS.experience, defaultExperience)).sort((a, b) => a.order - b.order) }

export function saveProjects(data) { save(STORAGE_KEYS.projects, data) }
export function saveSkills(data) { save(STORAGE_KEYS.skills, data) }
export function saveEducation(data) { save(STORAGE_KEYS.education, data) }
export function saveExperience(data) { save(STORAGE_KEYS.experience, data) }

export function resetAll() {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
}

export function exportAll() {
  return JSON.stringify({
    projects: getAllProjects(),
    skills: getSkills(),
    education: getAllEducation(),
    experience: getAllExperience(),
    exportedAt: new Date().toISOString()
  }, null, 2)
}

export function importAll(jsonString) {
  const data = JSON.parse(jsonString)
  if (data.projects) saveProjects(data.projects)
  if (data.skills) saveSkills(data.skills)
  if (data.education) saveEducation(data.education)
  if (data.experience) saveExperience(data.experience)
}

export { STORAGE_KEYS, defaultProjects, defaultSkills, defaultEducation, defaultExperience }
