/* eslint-disable prettier/prettier */
import { ChangeEvent, useEffect, useState } from 'react'
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'

import { AppDispatch, RootState } from '../../redux/store'
import { fechCategories, deleteCategory } from '../../redux/slices/products/categorySlice';


const Categories = () => {
    const [categoryName, setCategoryName] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    const {items ,isLoading , error } = useSelector((state: RootState) => state.categories)
    //const categories = state.categories


    useEffect(() => {
        dispatch(fechCategories())
    }
        , [])
    console.log(items)

    const handelDelete = (id: number) => {
        dispatch(deleteCategory(id))
    }
    const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value)
    }
    /*const handelSubmit = (event: FormEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value)
    }*/

    if (isLoading) {
        return <p>loding ...</p>
    }
    if (error) {
        return <p>{error}</p>
    }

    return (
        < div>
            <div className='contant'>

                <Toolbar />
                <Typography variant="h4">Products Categoris</Typography>
                <Typography variant="h5">add New Category
                    <form >
                        <input type="text" name="category" value={categoryName} onChange={handelChange} />
                        <IconButton color="primary" aria-label="add">
                            <AddIcon />
                        </IconButton>
                    </form>
                </Typography>
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
                                        <IconButton color="secondary" aria-label="edit">
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
        </div>
        
    )
}
export default Categories
