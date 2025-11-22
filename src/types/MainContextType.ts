export type MainContextType = {
    showToast: (message: string, severity: 'success' | 'error' | 'warn') => void;
}