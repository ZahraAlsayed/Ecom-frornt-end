import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
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
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { AppDispatch, RootState } from '../../redux/store'
import {
  createCategory,
  deletecaregoy,
  fechCategories,
  updateCategory
} from '../../redux/slices/products/categorySlice'

import '../../style/table.css'

const Categories = () => {
  const [categoryName, setCategoryName] = useState('')
  const [isEdit, setEditValue] = useState(false)
  const [categoryId, setCategoryId] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.categories)
  useEffect(() => {
    dispatch(fechCategories())
  }, [dispatch])
  const handelDelete = (id: string) => {
    try {
      dispatch(deletecaregoy(id))
      toast.success(`Category deleted sucssfuly `)
    } catch (error) {
      toast.error('Somting Wrong , can not delet the category ')
    }
  }
  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }

  const handelSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isEdit) {
      dispatch(createCategory(categoryName))
      toast.success(`Category created sucssfuly `)
    } else {
      // const updatingCategory = { id: categoryId, name: categoryName };
      dispatch(updateCategory({ _id: categoryId, name: categoryName }))
      toast.success(`Category updated sucssfuly `)
      setCategoryName('')
      setEditValue(false)
    }

    setCategoryName('')
  }
  const handelEidtCategory = (id: string, name: string) => {
    setCategoryId(id)
    setEditValue(true)
    setCategoryName(name)
  }
  return (
    <div className="contant">
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
      <Toolbar />
      <Typography variant="h4">Products Categoris</Typography>
      <form onSubmit={handelSubmit}>
        <input
          style={{
            flex: 0.5,
            width: '300px',
            padding: '10px',
            border: '2px solid #ccc',
            borderRadius: '40px',
            marginLeft: '300px',
            color: 'rgb(102, 102, 102)'
          }}
          type="text"
          name="category"
          placeholder="add New Category"
          value={categoryName}
          onChange={handelChange}
        />
        <span>
          {' '}
          <button className="add-button">{isEdit ? 'Update' : 'Add'}</button>
        </span>
        {/* <span> <button type="submit">add</button></span> */}
      </form>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.items.map((category) => (
                <TableRow key={category._id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    <IconButton
                      color="secondary"
                      aria-label="edit"
                      onClick={() => {
                        handelEidtCategory(category._id, category.name)
                      }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      onClick={() => {
                        handelDelete(category._id)
                      }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
export default Categories
