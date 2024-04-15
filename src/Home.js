import React from 'react';
import Slider from "react-slick";
import BackgroundImg from './Images/Back.png';
import PopularItems from './Images/PopularItems.png';

export default function Home({ setCartItems, data }) {

  const addToCart = (name, img, price) => {
    const newItem = { name, img, price };
    console.log("Adding item to cart:", newItem); // Проверка перед добавлением
    setCartItems(prevCartItems => {
      const updatedCartItems = [...prevCartItems, newItem];
      console.log("Updated cart items in Home:", updatedCartItems);
      return updatedCartItems;
    });
  };
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  return (
    <div>
      <div className='body'>
        <img src={BackgroundImg} alt="Background" />
        <img src={PopularItems} alt="PopularItems" />
      </div>
      <div>
        <div>
          <Slider {...settings}>
            {data.map((d, index) => (
              <div key={index} className="stslide">
                <div className="ndslide">
                  <img src={d.img} alt={d.name} />
                </div>
                <div className="rdslide">
                  <p>{d.name}</p>
                  <p>{d.price}</p>
                  <button className="orderbutton" onClick={() => addToCart(d.name, d.img, d.price)}>Заказать</button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
