'use client'

import { useEffect } from 'react'
import { X, CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react'
import { Toast as ToastType } from '@/types'
import { cn } from '@/lib/utils'

interface ToastProps {
  toast: ToastType
  onClose: (id: string) => void
}

export default function Toast({ toast, onClose }: ToastProps) {
  const { id, message, type } = toast

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  }

  const styles = {
    success: 'bg-success-light border-success text-success-dark',
    error: 'bg-danger-light border-danger text-danger-dark',
    warning: 'bg-warning-light border-warning text-warning-dark',
    info: 'bg-info-light border-info text-info-dark',
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 min-w-80 max-w-md p-4 rounded-lg border-l-4 shadow-lg',
        'backdrop-blur-sm bg-white/95',
        'animate-slide-down',
        styles[type]
      )}
      role="alert"
    >
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>

      <div className="flex-1">
        <p className="text-sm font-medium leading-relaxed">{message}</p>
      </div>

      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
