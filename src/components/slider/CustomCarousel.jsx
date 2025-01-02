import React from "react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./CustomCarousel.css";

const CustomCarousel = (props) => {

  console.log("all shops ar props", props)

  const Shops = props.shops;
  console.log("all shops ar here", Shops)
  const CompHeading = props.compheading;

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable auto-scroll
    autoplaySpeed: 3000, // Speed of auto-scroll in milliseconds (3 seconds)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="custom_carousel">
      <div className="heading-carousel">
        <p>{CompHeading}</p>
      </div>

      <div className="item-list-carousel">
        <Slider {...settings}>
          {Shops.map((shop, index) => (
            <div className="box-carousel" key={shop.id || index}>
              <img
                className="box-carousel_image"
                src={shop.images[0]}
                alt={shop.name}
              />
              <div className="text-carousel">
                <p>{shop.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomCarousel;