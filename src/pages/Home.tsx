/* eslint-disable prettier/prettier */
import { ChangeEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardContent, Typography, CardActionArea, CardMedia, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Container from '@mui/material/Container'
import { Link } from 'react-router-dom';

import {
  productsRequest,
  productsSuccess,
  removeProduct,
  getSreachResult,
  sortProducts,
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'

import api from '../api'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import Header from '../components/Header'
import ImageSlider from '../components/ImageSlider'
import '../style/header.css'


const Home = () => {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products

  useEffect(() => {
    handleGetProducts()
  }, [])

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
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const sreachInput = event.target.value;
    dispatch(getSreachResult(sreachInput));

  };

  const filteredProducts = products.items.filter((product) => {
    const searchValue = products.searchingThrem.toString().toLowerCase();
    return product.name.toLowerCase().includes(searchValue);
  });


  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search products" value={products.searchingThrem} onChange={handleSearch} />
      </div>
      <ImageSlider/>
      <div className="body">
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" style={{ marginTop: '50px' }}>
            Slider ..
          </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 17 }}>
            {filteredProducts.map((product) => (
              <Grid key={product.id} item xs={2} sm={4} md={4}>
                <Card className="product-card" sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.image}
                      alt={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                        {product.categories}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                    </CardContent>
                    <IconButton color="primary" aria-label="add to shopping cart" >
                      <AddShoppingCartIcon  fontSize="small" />
                    </IconButton>
                    <Link to={`/product/${product.id}`}>
                      <Button>Show details</Button>
                    </Link>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </div>

  )
}
export default Home
