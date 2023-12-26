/* eslint-disable prettier/prettier */
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../style/searchInput.css'
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
        'https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446914/kz0degrj492ogw3xgvy5.png',
        'https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446914/wvyejq4zhm6zozmtua34.png',
        'https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446914/bxnzh4o1jglaxdxy3ufq.png',
        'https://res.cloudinary.com/dc9snu7rk/image/upload/v1703446913/ly872uuaasmevekotfma.png',




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
