/* eslint-disable prettier/prettier */
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../style/searchInput.css'
const settings = {
    dots: true, 
    infinite: true, 
    speed: 200, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
};

const ImageSlider = () => {
    const images = [
        './src/assets/welcome.png',
        './src/assets/offers.png',
        './src/assets/banner3.png',
        './src/assets/banner4.png',




    ];

    return (
        <div className='slider'>
            <Slider {...settings} >
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image} alt={`Slide ${index}`} width={1200} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ImageSlider;
