/* eslint-disable prettier/prettier */
import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Loop the slider
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll on arrow click
};

const ImageSlider = () => {
    const images = [
        'src/image-removebg-preview.png',
        'image-removebg-preview.png',
        'image3.jpg',
        // Add more image URLs here
    ];

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Slide ${index}`} />
                </div>
            ))}
        </Slider>
    );
};

export default ImageSlider;
