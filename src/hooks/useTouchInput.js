// ============================================
// 📁 src/hooks/useTouchInput.js
// Sistema completo de seleção mobile em um único arquivo
// ============================================

import { useEffect, useRef } from 'react';

// ============================================
// UTILITÁRIO - Detecção de dispositivo touch
// ============================================

/**
 * Verifica se o dispositivo suporta touch
 * @returns {boolean} true se for dispositivo touch
 */
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0);

// ============================================
// HOOK GENÉRICO - Single Input
// ============================================

/**
 * Hook genérico para seleção mobile em um único input
 * - Single tap: coloca cursor no final do texto
 * - Double tap: seleciona todo o texto
 * 
 * @param {React.RefObject} inputRef - Referência para o input
 * @param {Object} options - Opções de configuração
 * @param {number} options.doubleTapMs - Tempo máximo entre toques (padrão: 350ms)
 */
export function useTouchInput(inputRef, options = {}) {
  const opts = { doubleTapMs: 350, ...options };
  
  const lastTap = useRef(0);
  const timer = useRef(null);
  const isSelectingAll = useRef(false);

  useEffect(() => {
    if (!isTouchDevice()) return;

    const focusAtEnd = (input) => {
      if (!input || isSelectingAll.current) return;
      
      try {
        input.focus();
        const textLength = input.value?.length ?? 0;
        input.setSelectionRange(textLength, textLength);
      } catch (error) {
        console.warn('Erro ao posicionar cursor:', error);
      }
    };

    const selectAll = (input) => {
      if (!input) return;
      
      try {
        isSelectingAll.current = true;
        input.focus();
        
        setTimeout(() => {
          input.select();
          
          setTimeout(() => {
            isSelectingAll.current = false;
          }, 100);
        }, 50);
      } catch (error) {
        console.warn('Erro ao selecionar texto:', error);
        isSelectingAll.current = false;
      }
    };

    const handleTap = (event) => {
      const isTouchEvent =
        event.type === 'touchend' || 
        (event.type === 'pointerup' && event.pointerType === 'touch');
      
      if (!isTouchEvent) return;

      const now = Date.now();
      const inputElement = inputRef?.current;
      
      if (!inputElement) return;

      const timeSinceLastTap = now - lastTap.current;

      if (isSelectingAll.current) {
        event.preventDefault?.();
        event.stopPropagation?.();
        return;
      }

      // DOUBLE TAP
      if (timeSinceLastTap > 0 && timeSinceLastTap <= opts.doubleTapMs) {
        if (timer.current) {
          clearTimeout(timer.current);
          timer.current = null;
        }
        
        selectAll(inputElement);
        lastTap.current = 0;
      } 
      // SINGLE TAP
      else {
        lastTap.current = now;
        
        if (timer.current) clearTimeout(timer.current);
        
        timer.current = setTimeout(() => {
          if (lastTap.current === now && !isSelectingAll.current) {
            focusAtEnd(inputElement);
          }
          timer.current = null;
        }, opts.doubleTapMs + 10);
      }

      event.preventDefault?.();
      event.stopPropagation?.();
    };

    const handleTouchStart = (event) => {
      if (isSelectingAll.current) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const element = inputRef?.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('pointerup', handleTap, { passive: false });
    element.addEventListener('touchend', handleTap, { passive: false });

    return () => {
      element.removeEventListener('pointerup', handleTap);
      element.removeEventListener('touchend', handleTap);
      element.removeEventListener('touchstart', handleTouchStart);
      
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [inputRef, opts.doubleTapMs]);
}

// ============================================
// HOOK ESPECIALIZADO - Pares de Inputs (min/max)
// ============================================

/**
 * Hook para seleção mobile em PARES de inputs (min/max)
 * Usa o hook genérico internamente
 * 
 * @param {React.RefObject} minRef - Referência para o input mínimo
 * @param {React.RefObject} maxRef - Referência para o input máximo
 * @param {Object} options - Opções de configuração
 */
export function useTouchInputPair(minRef, maxRef, options = {}) {
  // Aplica o hook genérico para cada input
  useTouchInput(minRef, options);
  useTouchInput(maxRef, options);
}

// ============================================
// HOOK ESPECIALIZADO - Múltiplos Inputs
// ============================================

/**
 * Hook para seleção mobile em MÚLTIPLOS inputs
 * Usa o hook genérico internamente
 * 
 * @param {Array<React.RefObject>} inputRefs - Array de referências de inputs
 * @param {Object} options - Opções de configuração
 */
// NOTE: useTouchInputMultiple foi removido por causa de regras de Hooks (chamar hooks em loops pode
// violar a ordem das chamadas entre renders). Se for necessário suportar múltiplos inputs, crie
// um hook dedicado que gerencie event listeners em um único useEffect (sem chamar useTouchInput
// dentro de loops). Esta função foi mantida intencionalmente ausente para evitar warnings/erros.

// ============================================
// EXPORT DEFAULT - Para compatibilidade
// ============================================

export default useTouchInput;