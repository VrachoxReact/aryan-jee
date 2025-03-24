"use client"

import { 
  createContext, 
  useContext, 
  useState, 
  useEffect, 
  ReactNode 
} from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string | null
}

interface AuthContextType {
  user: User | null
  status: "loading" | "authenticated" | "unauthenticated"
  signIn: (provider: string, options?: any) => Promise<any>
  signOut: () => Promise<any>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: (session.user as any).id || '',
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: (session.user as any).role || 'user',
      })
      
      setIsAdmin((session.user as any).role === 'admin')
    } else {
      setUser(null)
      setIsAdmin(false)
    }
  }, [session])

  const value = {
    user,
    status,
    signIn,
    signOut: () => signOut({ callbackUrl: '/' }),
    isAdmin,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 