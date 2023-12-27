import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  IconButton
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'

import { AppDispatch, RootState } from '../../redux/store'
import {
  baneUser,
  deleteUser,
  fechUsers,
  roleUser,
  unbaneUser
} from '../../redux/slices/userslices/userSlice'

import '../../style/admin.css'
import '../../style/table.css'

const UserList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { items, isLoading, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fechUsers())
  }, [dispatch])

  const handelDelete = async (id: string) => {
    try {
      dispatch(deleteUser(id))
      toast.success(`User deleted sucssfuly `)
    } catch (error) {
      toast.error('Somting Wrong .can not delet the user')
    }
  }
  const handelBanFunction = async (id: string, isBanned: boolean) => {
    try {
      const response = isBanned ? dispatch(unbaneUser(id)) : dispatch(baneUser(id))
      //dispatch(fechUsers());
      toast.success(`${response.massage}`)
    } catch (error) {
      toast.error(`${error.response.data.massage}`)
    }
  }
  const handelUserRoleFunction = async (id: string) => {
    try {
      dispatch(roleUser(id))
      toast.success('successfully changed role')
      dispatch(fechUsers)
    } catch (error) {
      toast.error('Error updating role')
    }
  }

  if (isLoading) {
    return <p>loding ...</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="table-container">
        <Toolbar />
        <Typography variant="h4">User List</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user) => {
                if (!user.isAdmin) {
                  return (
                    <TableRow key={user._id}>
                      <TableCell>
                        <img src={user.image} alt={user.name} width={20} />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          aria-label="delete"
                          onClick={() => {
                            handelDelete(user._id)
                          }}>
                          <DeleteIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                        <IconButton
                          aria-label="ban"
                          onClick={() => {
                            handelBanFunction(user._id, user.isBanned)
                          }}>
                          {user.isBanned ? 'unban' : 'ban'}
                          <BlockIcon sx={{ fontSize: 15, color: '#EC2A2A' }} />
                        </IconButton>
                        <button
                          className="add-button"
                          onClick={() => {
                            handelUserRoleFunction(user._id)
                          }}>
                          Admin privilege
                        </button>
                      </TableCell>
                    </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}

export default UserList
