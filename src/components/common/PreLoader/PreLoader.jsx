import { useEffect, useState } from 'react';
import './Preloader.scss';

const Preloader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="preload-container">
      <div className="middle"></div>
    </div>
  );
};

export default Preloader;