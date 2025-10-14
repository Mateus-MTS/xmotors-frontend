import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import '../../Listing/_car-item.scss';
import '../../Listing/_responsive-car-item.scss';

// Primeiro declare GalleryItem
const ImageItem = ({ image, alt, index, activeIndex, onHover }) => (
  <div
    className={`listing-item ${index === activeIndex ? 'active' : ''}`}
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(0)}
    onClick={() => onHover(index)}
    role="button"
    tabIndex={0}
    style={{ cursor: 'pointer' }}
  >
    {/* Primeira camada */}
    <div className="images">
      <img className="swiper-image lazy tfcl-light-gallery" title="BUSCAR DESCRIÇÃO" src={image} alt={alt} />
    </div>

    {/* Segunda camada - view-gallery */}
    <div className={`listing-item view-gallery ${activeIndex >= 3 ? 'active' : ''}`}>
      <div className='images'>
        <img className="swiper-image tfcl-light-gallery" title="BUSCAR DESCRIÇÃO" src={image} alt={alt} />
        {activeIndex >= 3 && (
          <div className="overlay-limit">
            <p>Veja mais 👉</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Bullets de navegação
const BulletsItem = ({ count, activeIndex, onHover }) => (
  <div className="bullet-hover-listing">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`bl-item ${activeIndex === i ? 'active' : ''}`}
        onMouseEnter={() => onHover(i)}
        onMouseLeave={() => onHover(0)}
        onClick={() => onHover(i)}
        role="button"
        tabIndex={0}
        style={{ cursor: 'pointer' }}
      />
    ))}
  </div>
);

// Componente principal
const ListingImages = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayedImages = useMemo(() => images.slice(0, 4), [images]);

  return (
    <div className="listing-images">
      <div className="hover-listing-image">
        <div className="wrap-hover-listing">
          {displayedImages.map((img, i) => (
            <ImageItem
              key={i}
              image={img}
              alt={`car-${i}`}
              index={i}
              activeIndex={activeIndex}
              onHover={setActiveIndex}
            />
          ))}

          <BulletsItem
            count={displayedImages.length}
            activeIndex={activeIndex}
            onHover={setActiveIndex}
          />
        </div>

      </div>
    </div>
  );
}

ImageItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
};

BulletsItem.propTypes = {
  count: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
};

ListingImages.defaultProps = {
  images: [],
};

export default ListingImages;