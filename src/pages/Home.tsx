/* eslint-disable prettier/prettier */
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Container from '@mui/material/Container'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link } from 'react-router-dom';

import {
  productsRequest,
  productsSuccess,
  getSreachResult,
  sortProducts,
  Product,
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import api from '../api'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import '../style/searchInput.css'
import { fechCategories } from '../redux/slices/products/categorySlice'
import '../style/home.css'
import { addToCart } from '../redux/slices/products/cartSlice'

const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products
  const categories = state.categories
  const [checkedCategories, setCheckedCategories] = useState<number[]>([])

  useEffect(() => {
    handleGetProducts()
  }, [])

  console.log(categories.items)
  /**
  * If you want to keep things simple you can follow this approach on updating
  * redux state when using async requests instead of using createAsyncThunk
  */
  const handleGetProducts = async () => {
    // let's first turn the loader to true so we can have a better UX
    dispatch(productsRequest())

    // Fetching from the local files
    const res = await api.get('/mock/e-commerce/products.json')
    // At this point we have the data so let's update the store
    dispatch(productsSuccess(res.data))
  }
  const handelAddToCart = (product: Product) => {
    dispatch(addToCart(product))
    toast.success(`${product.name} added to cart`, {
      position: "top-right",
      autoClose: 3000, // Duration in milliseconds
    });
  }


  const filteredProducts = products.items.filter((product) => {
    const selectedCategories =
      checkedCategories.length > 0
        ? checkedCategories.some((id) => product.categories.includes(Number(id)))

        : product

    const searchValue =
      products.searchingTerm != ''
        ? product.name.toLowerCase().includes(products.searchingTerm.toLowerCase().toLowerCase())

        : product

    return searchValue && selectedCategories

  })

  const getCategoryName = (categoryId: number) => {
    const categoryItem = categories.items.find((category) => category.id == categoryId)
    return categoryItem ? categoryItem.name + '  ' + "  " : "Category not found"
  }

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const sortingOption = event.target.value;
    dispatch(sortProducts(sortingOption));
  }
  const handleCategoryChange = (categoryId: number) => {
    if (checkedCategories.includes(categoryId)) {
      // Category is already selected, so unselect it
      setCheckedCategories(checkedCategories.filter(id => id !== categoryId));

    } else {
      setCheckedCategories((pervState) => {
        const checheckedValues = [...pervState, categoryId]
        return checheckedValues
      })
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const sreachInput = event.target.value;
    dispatch(getSreachResult(sreachInput));

  };

  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div>
        <ImageSlider />
      </div>
      <ToastContainer position="top-right"
        autoClose={3000} hideProgressBar={false}
        newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />;
      <div className="search-bar">
        <input type="text" placeholder="Search products" value={products.searchingTerm} onChange={handleSearch} />
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" name='sort' onChange={handleSort}>
            <option value="id" defaultValue='id'>Id</option>
            <option value="name">name</option>
          </select>
        </div>
      </div>
      <div className='categories'>
        <span>Filter by </span>
        {categories.items.map(category => (
          <div key={category.id} className='categories-box'>
            <label htmlFor='category'>
              <input
                type="checkbox"
                value={category.name}
                name='category'
                onChange={() => handleCategoryChange(category.id)}

              />
              {category.name}
            </label>

          </div>
        ))}
      </div>
      <div className="body" >
        <Container  >
          <Grid container item spacing={{ xs: 4, md: 4 }} alignItems='center'>
            {filteredProducts.map((product) => (
              <Grid key={product.id}
                item xs={10}
                sm={5} md={4}
                lg={4}
                alignItems='center'>
                <Card className="product-card" style={{
                  height: '520px', // Set the desired height
                  width: '100%', // Ensure the image takes the full width of the card
                  objectFit: 'cover', // Ensure the image covers the specified area
                  aspectRatio: '1/1', // Fixed aspect ratio (1:1 for square images)
                }}  >
                  <CardActionArea>

                    <CardMedia
                      style={{
                        height: '300px', // Set the desired height
                        width: '100%', // Ensure the image takes the full width of the card
                        objectFit: 'cover', // Ensure the image covers the specified area
                        aspectRatio: '1/1', // Fixed aspect ratio (1:1 for square images)
                      }}
                      sizes='small'
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.name}

                    />
                    <CardContent>
                      <Typography >
                        <p className='category' >
                          Categories :
                          {product.categories.map((categoryId) =>
                            getCategoryName(Number(categoryId))
                          )}
                        </p>
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>

                      <Typography gutterBottom component="div">
                        {product.prise} SAR
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={() => { handelAddToCart(product) }} >
                      <AddShoppingCartIcon fontSize="small" />
                    </IconButton>

                    <Link to={`/product/${product.id}`}>
                      <Button size='small' >Show details</Button>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <Footer />
    </div>

  )
}
export default Home
