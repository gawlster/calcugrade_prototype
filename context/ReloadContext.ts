import { createContext } from 'react'

interface ContextState {
    reload: boolean
    setReload: (v: boolean) => void
}

export const ReloadContext = createContext({} as ContextState)
