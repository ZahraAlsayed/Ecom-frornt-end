import { toast } from 'react-toastify'
import api from '../api'

export const registerNewUser = async (UserDeta: FormData) => {
  try {
    const res = await api.post(`/users/process-register`, UserDeta)
    toast.success('You have been registered successfully, check your email for activation')
    return res.data
  } catch (error) {
    throw new Error(`Failed to Rigster user`)
  }
}

export const activateUser = async (token: string) => {
  try {
    const res = await api.post(`/users/activate`, { token })
    toast.success('The account has been activated successfully, please log in')
    return res.data
  } catch (error) {
    throw new Error(`Failed to fetch users`)
  }
}
