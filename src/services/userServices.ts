import axios from 'axios'

import api from '../api'

export const registerNewUser = async (UserDeta: FormData) => {
  const res = await api.post(`/users/process-register`, UserDeta)
  return res.data
}
export const activateUser = async (token: string) => {
  const res = await api.post(`/users/activate`, { token })
  return res.data
}

// export const deleteUser = async (id: string) => {
//   const res = await api.delete(`/users/${id}`)
//   return res.data
// }
// export const baneUser = async (id: string) => {
//   const res = await api.put(`/users/ban/${id}`)
//   return res.data
// }
// export const unbaneUser = async (id: string) => {
//   const res = await api.put(`/users/unban/${id}`)
//   return res.data
// }
