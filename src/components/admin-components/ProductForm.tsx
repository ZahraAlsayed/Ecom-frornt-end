/* eslint-disable prettier/prettier */
import { useState, ChangeEvent, FormEvent, useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, createProduct, fetchProducts, Product, updateProduct } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

import '../../style/register.css'
import '../../style/table.css'
import { toast } from 'react-toastify'
// type ProductFormProps = {
//   product: Product
//   handleSubmit: (e: FormEvent) => void
//   handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
// }
// const initialProductState: Partial<Product> = {
//   _id: '',
//   title: '',
//   image: '',
//   description: '',
//   category: [],
//   price: 0
// }
export function ProductForm() {
  const dispatch = useDispatch<AppDispatch>()
  const { items, isLoading, error } = useSelector((state: RootState) => state.products)
  const [productEdit, setProductEdit] = useState(false)
  const [productId, setProductId] = useState('')
  const [product, setProduct] = useState({
    title: '',
    slug: '',
    image: '',
    description: '',
    category: '',
    quantity: 0,
    sold: 0,
    shipping: 0,
    price: 0
  })
  //const [editForm, setEditForm] = useState(false)
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      setProduct((prevProduct) => {
        return { ...prevProduct, [event.target.name]: fileInput.files?.[0] }
      })
    } else {
      setProduct((prevProduct) => {
        return { ...prevProduct, [event.target.name]: event.target.value }
      })
    }
  }

  // const handleEditItem = (id: string) => {
  //   const editedProduct = products.items.find((product) => product._id == id)
  //   if (editedProduct) {
  //     console.log(editedProduct)
  //     setProduct({ ...editedProduct, _id: editedProduct._id })
  //   }
  // }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!productEdit) {
      const formData = new FormData()
      formData.append('title', product.title)
      formData.append('price', product.price.toString())
      formData.append('image', product.image)
      formData.append('category', product.category.toString())
      formData.append('description', product.description)
      formData.append('quantity', product.quantity.toString())
      formData.append('sold', product.sold.toString())
      formData.append('shipping', product.shipping.toString())

      dispatch(createProduct(formData))
      toast.success('Successful Add Product')
      setProduct({
        title: '',
        slug: '',
        image: '',
        description: '',
        category: '',
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0
      })
    } else {
      const updateProducts = {
        _id: productId,
        title: product.title,
        slug: product.slug,
        image: product.image,
        description: product.description,
        category: product.category,
        quantity: product.quantity,
        sold: product.sold,
        shipping: product.shipping,
        price: product.price
      }
      dispatch(updateProduct(updateProducts))
      toast.success('Successful Update Product')
    }
  

  }
  const handleEdit = (
    _id: string,
    slug: string,
    title: string,
    image: string,
    description: string,
    category: string,
    quantity: number,
    sold: number,
    shipping: number,
    price: number
  ) => {
    setProductId(_id)
    setProductEdit(!productEdit)
    if (!productEdit) {
      setProduct({
        title,
        slug,
        image,
        description,
        category,
        quantity,
        sold,
        shipping,
        price
      })
    } else {
      setProduct({
        title: '',
        slug: slug,
        image: '',
        description: '',
        category: '',
        quantity: 0,
        sold: 0,
        shipping: 0,
        price: 0
      })
    }
  }

    return (

      <div >

        <form onSubmit={handleSubmit} >
          <div className="txtfield">
            <label htmlFor="title"  >
              Name:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={product.title}
              onChange={handleChange}
              required

            />
          </div>
          <div className="txtfield">
            <label htmlFor="image" >
              Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept='imafe/*'
              onChange={handleChange}

            />
          </div>
          <div className="txtfield">
            <label htmlFor="description" >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              required

            />
          </div>
          <div className="txtfield">
            <label htmlFor="category" >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              value={product.category}
              onChange={handleChange}

            />
          </div>
          <div className="txtfield">
            <label htmlFor="price" >
              Price:
            </label>
            <input
              type="numper"
              name="price"
              id="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="txtfield">
            <label htmlFor="sizes" >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="txtfield">
            <label htmlFor="sizes" >
              Sold Item
            </label>
            <input
              type="number"
              name="slod"
              id="slod"
              value={product.sold}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit">
            Add Product
          </button>
        </form>
      </div>

    )
  }
