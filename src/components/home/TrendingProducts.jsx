import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const nav = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const handleProductClick = (id) => {
    nav(`/product-details/${id}`);
  };
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      const newData = res.data.slice(10, 20);
      setProducts(newData);
    });
  }, []);

  return (
    <div className="w-full">
      <Slider {...settings}>
        {products.map((product) => (
          <div
            key={product.id}
            className="p-2 cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <div
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col h-[270px]
            items-center text-center transition-all duration-100 hover:shadow-2xl border-amber-400 cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-[150px] h-[150px] object-contain"
              />
              <h3 className="text-sm font-semibold mt-2">
                {product.title.substring(0, 20)}...
              </h3>
              <p className="text-lg font-bold text-red-600 mt-1">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500">
                ⭐ {product.rating.rate} / 5
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
