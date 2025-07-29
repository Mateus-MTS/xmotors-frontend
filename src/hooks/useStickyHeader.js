import { useState, useEffect, useRef } from 'react';

export default function useStickyHeader() {
  const [isFixed, setIsFixed] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const headerRef = useRef(null);
  const spacerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      const offsetTop = headerRef.current.offsetTop;
      const scrollTop = window.scrollY;
      
      // Verifica se o body tem a classe counter-scroll
      const hasCounterScroll = document.body.classList.contains('counter-scroll');
      
      if (hasCounterScroll) {
        setIsFixed(scrollTop > offsetTop);
        setIsSmall(scrollTop > 500);
        
        if (spacerRef.current) {
          spacerRef.current.style.display = scrollTop > offsetTop ? 'block' : 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isFixed, isSmall, headerRef, spacerRef };
}