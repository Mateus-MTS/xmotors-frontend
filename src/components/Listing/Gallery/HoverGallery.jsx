import { useState } from 'react';

export default function HoverGallery({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="hover-listing-image">
      <div className="main-image">
        <img src={items[activeIndex].image} alt={items[activeIndex].title} />
      </div>
      
      <div className="thumbnails">
        {items.map((item, index) => (
          <div 
            key={index}
            className={`listing-item ${index === activeIndex ? 'active' : ''}`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <img src={item.thumbnail} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}