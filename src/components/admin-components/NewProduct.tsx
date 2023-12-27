// /* eslint-disable prettier/prettier */
// import { useState, ChangeEvent, FormEvent, } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addProduct, Product } from '../../redux/slices/products/productSlice'
// import { AppDispatch, RootState } from '../../redux/store'

// import '../../style/register.css'
// import '../../style/table.css'

// // type ProductFormProps = {
// //     product: Product
// //     handleSubmit: (e: FormEvent) => void
// //     handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
// // }
// const initialProductState: Partial<Product> = {
//     _id: '',
//     title: '',
//     image: '',
//     description: '',
//     category: [],
//     price: 0
// }

// const NewProduct = () => {
     
//     const dispatch = useDispatch<AppDispatch>()
//     const products = useSelector((state: RootState) => state.products)
//     const [product, setProduct] = useState(initialProductState)
//     const [editForm, setEditForm] = useState(false)
//     const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target

//         const isList = name === 'categories' || name === 'variants' || name === 'sizes'
//         if (isList) {
//             setProduct({
//                 ...product,
//                 [name]: value.split(',')
//             })
//             return
//         }

//         setProduct({
//             ...product,
//             [name]: value
//         })
//     }
//     const handleEditItem = (id: string) => {
//         const editedProduct = products.items.find((product) => product._id == id)
//         if (editedProduct) {

//             setProduct({ ...editedProduct, _id: editedProduct._id })
//         }
//     }
//     const handleSubmit = (e: FormEvent) => {
//         e.preventDefault()
//         // Send the product data to your backend or in this case send it to Redux

//         // let's add Id property to the object (usually IDs are generated automatically on the backend)



//         //   dispatch(addProduct({ product }))
//         //   // Reset the form
//         //   setProduct(initialProductState)
//         // }


//         return (

//             <div className="table-container">

//                 <form onSubmit={handleSubmit} >
//                     <div className="txtfield">
//                         <label htmlFor="name"  >
//                             Name:
//                         </label>
//                         <input
//                             type="text"
//                             name="name"
//                             id="name"
//                             value={product.title}
//                             onChange={handleChange}
//                             required

//                         />
//                     </div>
//                     <div className="txtfield">
//                         <label htmlFor="image" >
//                             Image URL:
//                         </label>
//                         <input
//                             type="text"
//                             name="image"
//                             id="image"
//                             value={product.image}
//                             onChange={handleChange}

//                         />
//                     </div>
//                     <div className="txtfield">
//                         <label htmlFor="description" >
//                             Description:
//                         </label>
//                         <textarea
//                             name="description"
//                             id="description"
//                             value={product.description}
//                             onChange={handleChange}
//                             required

//                         />
//                     </div>
//                     <div className="txtfield">
//                         <label htmlFor="categories" >
//                             Categories: (use comma , to create multiple)
//                         </label>
//                         <input
//                             type="text"
//                             name="categories"
//                             id="categories"
//                             value={product.category}
//                             onChange={handleChange}

//                         />
//                     </div>
//                     <div className="txtfield">
//                     </div>
//                     <div className="txtfield">
//                     </div>
//                     <button
//                         type="submit">
//                         Add Product
//                     </button>
//                 </form>
//             </div>

//         )

//     }
// }
// export default NewProduct