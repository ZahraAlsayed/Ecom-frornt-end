import React, { ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'



import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { AppDispatch, RootState } from '../redux/store'

interface ImageSliderProps {
  images: string[]
}

function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector((state: RootState) => state)
  const products = state.products

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0)

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (current: number, next: number) => setActiveSlide(next),
  };

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="image-slide">
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
      <div className="slider-dots">
        {products.map((_, index) => (
          <span
            key={index}
            className={index === activeSlide ? 'active' : ''}
          ></span>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
