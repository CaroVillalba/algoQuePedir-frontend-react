export type NavigateWithGuard = (
    to: string,
    ctx?: { isInCartArea?: boolean }
) => void

export type MainContextType = {
    showToast: (message: string, severity: 'success' | 'error' | 'warning') => void
    navigateWithGuard: NavigateWithGuard
    isInCartArea?: boolean
}
