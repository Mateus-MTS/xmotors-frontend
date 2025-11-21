import { useEffect, useRef, useState, useCallback } from 'react';

export default function useStickySidebar(options = {}) {
  const sidebarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const timerRef = useRef(null);
  const observerRef = useRef(null);
  
  const {
    topSpacing = 0,
    bottomSpacing = 0,
    containerSelector = '.page-menu1-wrap',
    innerWrapperSelector = '.po-sticky',
    disableOnMobile = true,
    mobileBreakpoint = 768
  } = options;

  const handleScroll = useCallback(() => {
    if (!sidebarRef.current || !document.body.classList.contains('sticky-scroll')) {
      return;
    }

    // Desativa em dispositivos móveis se configurado
    if (disableOnMobile && window.innerWidth <= mobileBreakpoint) {
      return;
    }

    const container = document.querySelector(containerSelector);
    const innerWrapper = sidebarRef.current.querySelector(innerWrapperSelector);

    if (!container || !innerWrapper) {
      console.warn('StickySidebar: Container or inner wrapper not found');
      return;
    }

    // Usa requestAnimationFrame para melhor performance
    if (timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }

    timerRef.current = requestAnimationFrame(() => {
      const containerRect = container.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const scrollDirection = scrollY > (sidebarRef.current.lastScrollY || 0) ? 'down' : 'up';
      sidebarRef.current.lastScrollY = scrollY;

      // Calcula os limites
      const containerBottom = containerRect.bottom - bottomSpacing;
      const sidebarBottom = sidebarRect.bottom;
      const shouldStick = sidebarRect.top <= topSpacing;
      const shouldUnstick = scrollDirection === 'up' && sidebarBottom >= containerBottom;

      if (shouldStick && !isSticky) {
        // Salva a largura original antes de modificar
        const originalWidth = sidebarRect.width;
        innerWrapper.style.position = 'fixed';
        innerWrapper.style.top = `${topSpacing}px`;
        innerWrapper.style.width = `${originalWidth}px`;
        innerWrapper.style.zIndex = '1000';
        setIsSticky(true);
        
        // Dispara evento personalizado
        document.dispatchEvent(new CustomEvent('stickySidebarStateChange', { 
          detail: { isSticky: true } 
        }));
      } else if ((shouldUnstick || !shouldStick) && isSticky) {
        innerWrapper.style.position = '';
        innerWrapper.style.top = '';
        innerWrapper.style.width = '';
        innerWrapper.style.zIndex = '';
        setIsSticky(false);
        
        // Dispara evento personalizado
        document.dispatchEvent(new CustomEvent('stickySidebarStateChange', { 
          detail: { isSticky: false } 
        }));
      }
    });
  }, [isSticky, topSpacing, bottomSpacing, containerSelector, innerWrapperSelector, disableOnMobile, mobileBreakpoint]);

  // Configura o IntersectionObserver
  const setupObserver = useCallback(() => {
    if (!sidebarRef.current || observerRef.current) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', handleScroll, { passive: true });
          } else {
            window.removeEventListener('scroll', handleScroll);
          }
        });
      },
      { 
        root: null,
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(container);
  }, [containerSelector, handleScroll]);

  useEffect(() => {
    if (!sidebarRef.current) return;

    // Verifica imediatamente se precisa ser sticky
    handleScroll();
    setupObserver();

    // Configura o resize observer para lidar com responsividade
    const resizeObserver = new ResizeObserver(() => {
      handleScroll();
    });

    resizeObserver.observe(document.body);

    // Capture referências mutáveis para uso no cleanup (evita warnings sobre ref mutável)
    const capturedTimer = timerRef.current;
    const capturedObserver = observerRef.current;
    const capturedSidebar = sidebarRef.current;

    // Limpeza
    return () => {
      if (capturedTimer) {
        cancelAnimationFrame(capturedTimer);
      }
      window.removeEventListener('scroll', handleScroll);
      if (capturedObserver) {
        capturedObserver.disconnect();
      }
      resizeObserver.disconnect();

      // Restaura estilos ao desmontar usando a referência capturada
      const innerWrapper = capturedSidebar?.querySelector(innerWrapperSelector);
      if (innerWrapper) {
        innerWrapper.style.position = '';
        innerWrapper.style.top = '';
        innerWrapper.style.width = '';
        innerWrapper.style.zIndex = '';
      }
    };
  }, [handleScroll, setupObserver, innerWrapperSelector]);

  // Atualiza quando as opções mudam
  useEffect(() => {
    handleScroll();
  }, [topSpacing, bottomSpacing, handleScroll]);

  return { 
    sidebarRef, 
    isSticky,
    updateSticky: handleScroll // Permite forçar uma atualização externamente
  };
}