/* eslint-disable prettier/prettier */
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
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
    IconButton,
    Button,

} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'


import { AppDispatch, RootState } from '../../redux/store'
import {
    fechCategories,
    deleteCategory,
    addCategort,
    updateCategory
} from '../../redux/slices/products/categorySlice';

import '../../style/table.css'

const Categories = () => {
    const [categoryName, setCategoryName] = useState('')
    const [isEdit, setEditValue] = useState(false)
    const [categoryId, setCategoryId] = useState(0)

    const dispatch = useDispatch<AppDispatch>()
    const { items, isLoading, error } = useSelector((state: RootState) => state.categories)
    useEffect(() => {
        dispatch(fechCategories())
    }
        , [])

    const handelDelete = (id: number) => {
        dispatch(deleteCategory(id))
    }
    const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value)
    }
    
    const handelSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!isEdit) {
            const newCategory = { id: `${new Date().getTime()}-${Math.floor(Math.random() * 1000)}`, name: categoryName };
            dispatch(addCategort(newCategory))
        } else {
            const updatingCategory = { id: categoryId, name: categoryName };
            dispatch(updateCategory(updatingCategory))
        }

        setCategoryName('')

    }
    const handelEidtCategory = (id: number, name: string) => {
        setCategoryId(id)
        setEditValue(true)
        setCategoryName(name)
    }

    if (isLoading) {
        return <p>loding ...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        <div className='contant'>
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
                        color: 'rgb(102, 102, 102)',
                    }}
                    type="text" name="category" placeholder='add New Category'
                    value={categoryName} onChange={handelChange} />
                <span> <button>{isEdit ? 'Update' : 'Add'}</button></span>
            </form>
            <div className="table-container">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <IconButton color="secondary" aria-label="edit" onClick={() => { handelEidtCategory(category.id, category.name) }}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" aria-label="delete" onClick={() => {
                                            handelDelete(category.id)
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
        </div >

    )
}
export default Categories
