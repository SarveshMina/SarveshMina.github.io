const PASSWORD_HASH = 'f5fab5af61a988d5bc40ac5a26e8768f92914addb51283ef38e89ee436be4b60'

export async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password) {
  const hash = await hashPassword(password)
  return hash === PASSWORD_HASH
}

export function isAuthenticated() {
  return sessionStorage.getItem('admin_authenticated') === 'true'
}

export function login() {
  sessionStorage.setItem('admin_authenticated', 'true')
}

export function logout() {
  sessionStorage.removeItem('admin_authenticated')
}
