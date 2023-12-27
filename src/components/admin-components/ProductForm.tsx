import { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  fetchProducts,
  updateProduct
} from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'

import '../../style/register.css'
import '../../style/table.css'
import { ToastContainer, toast } from 'react-toastify'

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
  const [productError, setProductError] = useState({
    title: '',
    slug: '',
    image: '',
    description: '',
    category: '',
    quantity: '',
    sold: '',
    shipping: '',
    price: ''
  })
  //const [editForm, setEditForm] = useState(false)
  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  const validateForm = () => {
    const newErrors = { ...productError }

    if (!product.title || product.title.length < 2) {
      newErrors.title = 'Plase Enter valid Name'
    } else {
      newErrors.title = ''
    }
    if (!product.category) {
      newErrors.category = 'categiry ID required'
    } else {
      newErrors.category = ''
    }
    if (!product.description || product.description.length < 6) {
      newErrors.description = 'The description must be more than one word'
    } else {
      newErrors.description = ''
    }
    if (!product.price) {
      newErrors.price = 'Plase product price'
    } else {
      newErrors.price = ''
    }
    if (!product.image) {
      newErrors.image = 'Plase Enteronly images'
    } else {
      newErrors.image = ''
    }

    setProductError(newErrors)

    // Return true if there are no errors, indicating the form is valid
    return !Object.values(newErrors).some((error) => !!error)
  }
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
      if (!validateForm()) {
        return // If the form is not valid, do not submit.
      }

      dispatch(createProduct(formData))
      toast.success(`Successful Add  ${product.title}`)
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
      toast.success('Successful Updating Product')
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

      <form onSubmit={handleSubmit}>
        <div className="txtfield">
          <label htmlFor="title">Name:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span className="error-message">{productError.title}</span>
        </div>
        <div className="txtfield">
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" accept="image/*" onChange={handleChange} />
        </div>
        <div>
          <span className="error-message">{productError.image}</span>
        </div>
        <div className="txtfield">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <span className="error-message">{productError.description}</span>
        </div>
        <div className="txtfield">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <span className="error-message">{productError.category}</span>
        </div>
        <div className="txtfield">
          <label htmlFor="price">Price:</label>
          <input
            type="numper"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <span className="error-message">{productError.price}</span>
        </div>
        <div className="txtfield">
          <label htmlFor="sizes">Quantity</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="txtfield">
          <label htmlFor="sizes">Sold Item</label>
          <input type="number" name="slod" id="slod" value={product.sold} onChange={handleChange} />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  )
}
