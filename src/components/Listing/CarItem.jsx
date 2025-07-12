import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Ícone SVG reutilizável
const FeatureBadgeIcon = () => (
  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
      fill="white"
    />
    <path
      d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
      fill="white"
    />
  </svg>
);

// Badge com condição e destaque
const ConditionBadge = ({ condition, imageCount, featured }) => {
  if (!featured) return null;
  const formatted = condition.charAt(0).toUpperCase() + condition.slice(1);
  return (
    <div className="feature">
      <span>{formatted}</span>
      <div className="cut">
        <FeatureBadgeIcon />
        <p>{imageCount}</p>
      </div>
    </div>
  );
};

ConditionBadge.propTypes = {
  condition: PropTypes.string.isRequired,
  imageCount: PropTypes.number.isRequired,
  featured: PropTypes.bool.isRequired,
};

// Imagem da galeria com possível overlay
const GalleryItem = ({ image, alt, index, activeIndex, onHover, isLast }) => (
  <div
    className={`listing-item ${index === activeIndex ? 'active' : ''} ${isLast ? 'view-gallery' : ''}`}
    onMouseEnter={() => onHover(index)}
  >
    <div className="images">
      <img src={image} alt={alt} />
      {isLast && (
        <div className="overlay-limit">
          <p>Veja mais 👉</p>
        </div>
      )}
    </div>
  </div>
);

GalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
};

// Bullets de navegação
const GalleryBullets = ({ count, activeIndex, onHover }) => (
  <div className="bullet-hover-listing">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`bl-item ${activeIndex === i ? 'active' : ''}`}
        onMouseEnter={() => onHover(i)}
      />
    ))}
  </div>
);

GalleryBullets.propTypes = {
  count: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  onHover: PropTypes.func.isRequired,
};

// Especificações técnicas do carro
const CarSpecification = ({ icon, label, value }) => (
  <li className={`listing-information ${icon}`}>
    <i className={`icon-${icon}`}></i>
    <div className="inner">
      <span>{label}</span>
      <p>{value}</p>
    </div>
  </li>
);

CarSpecification.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

// Componente principal
const CarItem = ({
  title,
  subtitle,
  price,
  year,
  condition,
  featured,
  mileage,
  fuel,
  transmission,
  acceptsExchange,
  images,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayedImages = useMemo(() => images.slice(0, 4), [images]);
  const hasMoreImages = images.length > 3;

  return (
    <div className="tf-car-service">
      <a href="listing-details.html" className="image">
        <div className="stm-badge-top">
          <ConditionBadge
            condition={condition}
            imageCount={images.length}
            featured={featured}
          />
          <span>{year}</span>
        </div>

        <div className="listing-images">
          <div className="hover-listing-image">
            <div className="wrap-hover-listing">
              {displayedImages.map((img, i) => (
                <GalleryItem
                  key={i}
                  image={img}
                  alt={`car-${i}`}
                  index={i}
                  activeIndex={activeIndex}
                  onHover={setActiveIndex}
                  isLast={hasMoreImages && i === 3}
                />
              ))}

              <GalleryBullets
                count={displayedImages.length}
                activeIndex={activeIndex}
                onHover={setActiveIndex}
              />
            </div>
          </div>
        </div>
      </a>

      <div className="content">
        <span className="sub-title">{subtitle}</span>
        <h6 className="title">
          <a href="listing-details.html">{title}</a>
        </h6>
        <span className="price">R$ {price.toLocaleString()}</span>

        {acceptsExchange && <p className="exchange-info">Aceita trocas</p>}

        <div className="description">
          <ul>
            <CarSpecification icon="gasoline-pump-1" label="Combustível" value={fuel} />
            <CarSpecification icon="Group1" label="Km" value={mileage} />
            <CarSpecification icon="gearbox-1" label="Câmbio" value={transmission} />
          </ul>
        </div>

        <div className="bottom-btn-wrap">
          <div className="btn-read-more">
            <a className="more-link" href="listing-details.html">
              <span>Ver detalhes</span>
              <i className="icon-arrow-right2"></i>
            </a>
          </div>
          <div className="btn-group">
            <a href="#" className="icon-service">
              <i className="icon-shuffle-2-11"></i>
            </a>
            <a href="#" className="icon-service">
              <i className="icon-heart-1-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

CarItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  price: PropTypes.number,
  year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  condition: PropTypes.string,
  featured: PropTypes.bool,
  mileage: PropTypes.string,
  fuel: PropTypes.string,
  transmission: PropTypes.string,
  acceptsExchange: PropTypes.bool,
  images: PropTypes.arrayOf(PropTypes.string),
};

CarItem.defaultProps = {
  title: '',
  subtitle: '',
  price: 0,
  year: '',
  condition: 'usado',
  featured: false,
  mileage: '',
  fuel: '',
  transmission: '',
  acceptsExchange: false,
  images: [],
};

export default CarItem;
