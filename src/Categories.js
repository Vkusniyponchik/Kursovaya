import React from 'react';
import { Navigation } from './Components/Navigation';
import Guitars from './Images/GuitarsCatagory.png';
import Soul from './Images/Духовные.png';
import Kicks from './Images/Ударные.png';
import Piano from './Images/Клавишные.png'
export default function Categories() {
  const categories = [
    { id: 1, name: 'Струнные', image: Guitars },
    { id: 2, name: 'Духовые', image: Soul},
    { id: 3, name: 'Ударные', image: Kicks },
    { id: 4, name: 'Клавишные', image: Piano },
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      {categories.map((category) => (
        <div key={category.id} style={{ margin: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src={category.image} alt={category.name} style={{ width: '200px', height: '200px', marginBottom: '10px' }} />
          <h3>{category.name}</h3>
        </div>
      ))}
    </div>
  );
}
