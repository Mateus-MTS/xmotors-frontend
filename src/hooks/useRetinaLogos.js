import { useEffect } from 'react';

/**
 * Hook para substituição automática de logos por versões retina
 * @param {Object} config - Configurações dos logos
 * @param {string} config.headerLogo - Caminho padrão do logo do header
 * @param {string} config.headerLogoRetina - Caminho do logo retina do header
 * @param {string} config.footerLogo - Caminho padrão do logo do footer
 * @param {string} config.footerLogoRetina - Caminho do logo retina do footer
 */
export default function useRetinaLogos({
  headerLogo = '../../public/assets/images/logo/logo.png',
  headerLogoRetina = '../../public/assets/images/logo/logo@2x.png',
  footerLogo = '../../public/assets/images/logo/logo-footer.png',
  footerLogoRetina = '../../public/assets/images/logo/logo-footer@2x.png'
} = {}) {
  useEffect(() => {
    const isRetina = window.devicePixelRatio > 1;
    
    if (!isRetina) return;

    // Substitui o logo do header
    const headerLogoEl = document.querySelector('#header .logo img');
    if (headerLogoEl) {
      headerLogoEl.src = headerLogoRetina;
      headerLogoEl.srcset = `${headerLogo} 1x, ${headerLogoRetina} 2x`;
    }

    // Substitui o logo do footer
    const footerLogoEl = document.querySelector('#Footer .widget-info img');
    if (footerLogoEl) {
      footerLogoEl.src = footerLogoRetina;
      footerLogoEl.srcset = `${footerLogo} 1x, ${footerLogoRetina} 2x`;
    }

    // Fallback para casos onde o srcset não é suportado
    const handleError = (e) => {
      const img = e.target;
      if (img.src.endsWith('@2x.png')) {
        img.src = img.src.replace('@2x.png', '.png');
      }
    };

    if (headerLogoEl) headerLogoEl.addEventListener('error', handleError);
    if (footerLogoEl) footerLogoEl.addEventListener('error', handleError);

    return () => {
      if (headerLogoEl) headerLogoEl.removeEventListener('error', handleError);
      if (footerLogoEl) footerLogoEl.removeEventListener('error', handleError);
    };
  }, [headerLogo, headerLogoRetina, footerLogo, footerLogoRetina]);
}