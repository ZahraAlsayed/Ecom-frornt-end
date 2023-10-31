/* eslint-disable prettier/prettier */
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../style/searchInput.css'
const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop the slider
    speed: 200, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll on arrow click
};

const ImageSlider = () => {
    const images = [
        './src/assets/welcome.png',
        './src/assets/offers.png',
        './src/assets/welcome.png'




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
