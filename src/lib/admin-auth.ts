// Mock authentication for admin dashboard
// This can be replaced with Better Auth + Neon later

export interface AdminUser {
  id: string
  email: string
  name: string
}

const ADMIN_CREDENTIALS = {
  email: 'admin@estelle.com',
  password: 'demo123',
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return {
      id: '1',
      email: email,
      name: 'Estelle Walters',
    }
  }

  return null
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem('admin_user')
  return stored ? JSON.parse(stored) : null
}

export function storeUser(user: AdminUser): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('admin_user', JSON.stringify(user))
}

export function clearUser(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem('admin_user')
}
