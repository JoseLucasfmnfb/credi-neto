import { useState } from '#app'

export interface Toast {
    id: string
    type: 'success' | 'error' | 'info' | 'warning'
    message: string
}

export const useToast = () => {
    // Usamos useState para manter o estado global e reativo entre páginas
    const toasts = useState<Toast[]>('app-toasts', () => [])

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9)
        toasts.value.push({ ...toast, id })

        // Auto remover após 5 segundos
        setTimeout(() => {
            removeToast(id)
        }, 5000)
    }

    const removeToast = (id: string) => {
        toasts.value = toasts.value.filter(t => t.id !== id)
    }

    return {
        toasts,
        addToast,
        removeToast,
        success: (message: string) => addToast({ type: 'success', message }),
        error: (message: string) => addToast({ type: 'error', message }),
        info: (message: string) => addToast({ type: 'info', message }),
        warning: (message: string) => addToast({ type: 'warning', message })
    }
}
