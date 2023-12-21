import { toast, ToastOptions } from 'react-toastify'

type ToastType = 'success' | 'error'

const toastFunctions: Record<ToastType, (message: string, options: ToastOptions) => void> = {
  success: toast.success,
  error: toast.error
}

export const showToast = (message: string, type: ToastType = 'success') => {
  const options: ToastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  }

  const toastFunction = toastFunctions[type] || toast

  toastFunction(message, options)
}
