import api from '../api'

export const registerNewUser = async (UserDeta: {}) => {
  try {
    const res = await api.post(`/users/process-register`, UserDeta)
    console.log(UserDeta)
    return res.data
  } catch (error) {
    throw new Error(`Failed to Rigster user}`)
  }
}

export const activateUser = async (token: string) => {
  try {
    const res = await api.post(`/users/activate`, { token })
    console.log(res.data)
    return res.data
  } catch (error) {
    throw new Error(`Failed to fetch users`)
  }
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
