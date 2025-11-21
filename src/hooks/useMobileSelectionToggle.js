import { useEffect, useRef } from 'react';

// Verifica se o dispositivo suporta touch
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0);

/**
 * Hook para toggle de seleção em dispositivos móveis
 * - Single tap: coloca cursor no final do texto
 * - Double tap: seleciona todo o texto
 * 
 * @param {React.RefObject} minRef - Referência para o input mínimo
 * @param {React.RefObject} maxRef - Referência para o input máximo  
 * @param {Object} options - Opções de configuração
 * @param {number} options.doubleTapMs - Tempo máximo entre toques para considerar double tap (padrão: 350ms)
 */
export default function useMobileSelectionToggle(minRef, maxRef, options = {}) {
  // Configurações com valores padrão
  const opts = { doubleTapMs: 350, ...options };
  
  // Referências para controlar o estado dos taps
  const lastTapMin = useRef(0);    // Timestamp do último tap no input mínimo
  const lastTapMax = useRef(0);    // Timestamp do último tap no input máximo
  const timerMin = useRef(null);   // Timer para o input mínimo
  const timerMax = useRef(null);   // Timer para o input máximo
  
  // Controla se estamos no processo de seleção total (para evitar interferência)
  const isSelectingAll = useRef({ min: false, max: false });

  useEffect(() => {
    // Sai se não for dispositivo touch
    if (!isTouchDevice()) return;

    /**
     * Coloca o cursor no final do texto do input
     * @param {HTMLInputElement} input - Elemento input
     * @param {string} which - Identificador do input ('min' ou 'max')
     */
    const focusAtEnd = (input, which) => {
      // Não faz nada se não há input ou se está selecionando tudo
      if (!input || isSelectingAll.current[which]) return;
      
      try {
        input.focus();
        const textLength = input.value?.length ?? 0;
        input.setSelectionRange(textLength, textLength);
      } catch {
        // Ignora erros silenciosamente
      }
    };

    /**
     * Seleciona todo o texto do input
     * @param {HTMLInputElement} input - Elemento input  
     * @param {string} which - Identificador do input ('min' ou 'max')
     */
    const selectAll = (input, which) => {
      if (!input) return;
      
      try {
        // Marca que estamos iniciando a seleção total
        isSelectingAll.current[which] = true;
        input.focus();
        
        // Aguarda um pouco antes de selecionar para garantir que o focus foi aplicado
        setTimeout(() => {
          input.select();
          
          // Reseta o flag após um delay para evitar interferência
          setTimeout(() => {
            isSelectingAll.current[which] = false;
          }, 100);
        }, 50);
      } catch {
        // Ignora erros silenciosamente
      }
    };

    /**
     * Cria um handler de eventos para um input específico
     * @param {string} which - Identificador do input ('min' ou 'max')
     * @returns {Function} Handler de eventos
     */
    const makeHandler = (which) => (event) => {
      // Verifica se é um evento de touch
      const isTouchEvent =
        event.type === 'touchend' || 
        (event.type === 'pointerup' && event.pointerType === 'touch');
      
      if (!isTouchEvent) return;

      const now = Date.now();
      const isMin = which === 'min';
      
      // Referências específicas para este input
      const lastTapRef = isMin ? lastTapMin : lastTapMax;
      const timerRef = isMin ? timerMin : timerMax;
      const inputElement = isMin ? minRef?.current : maxRef?.current;
      
      // Calcula o tempo desde o último tap
      const timeSinceLastTap = now - lastTapRef.current;

      // Bloqueia eventos se estivermos no meio de uma seleção total
      if (isSelectingAll.current[which]) {
        event.preventDefault?.();
        event.stopPropagation?.();
        return;
      }

      // DOUBLE TAP DETECTADO: selecionar todo o texto
      if (timeSinceLastTap > 0 && timeSinceLastTap <= opts.doubleTapMs) {
        // Limpa o timer pendente
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        
        selectAll(inputElement, which);
        lastTapRef.current = 0; // Reseta para evitar múltiplos double taps
      } 
      // SINGLE TAP DETECTADO: aguardar para ver se será double tap
      else {
        lastTapRef.current = now;
        
        // Limpa timer anterior se existir
        if (timerRef.current) clearTimeout(timerRef.current);
        
        // Configura timer para executar após o período de double tap
        timerRef.current = setTimeout(() => {
          // Só executa se ainda for o mesmo tap (não houve double tap)
          if (lastTapRef.current === now && !isSelectingAll.current[which]) {
            focusAtEnd(inputElement, which);
          }
          timerRef.current = null;
        }, opts.doubleTapMs + 10); // Pequeno buffer para garantir
      }

      // Previne comportamento padrão do navegador
      event.preventDefault?.();
      event.stopPropagation?.();
    };

    // Array para guardar os handlers e facilitar a limpeza
    const handlers = [];

    /**
     * Anexa os event listeners a um input
     * @param {React.RefObject} ref - Referência do input
     * @param {string} which - Identificador do input ('min' ou 'max')
     */
    const attachListeners = (ref, which) => {
      if (!ref?.current) return;
      
      const tapHandler = makeHandler(which);
      
      // Handler adicional para touchstart (prevenção mais cedo)
      const touchStartHandler = (event) => {
        if (isSelectingAll.current[which]) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      
      // Adiciona event listeners
      ref.current.addEventListener('touchstart', touchStartHandler, { passive: false });
      ref.current.addEventListener('pointerup', tapHandler, { passive: false });
      ref.current.addEventListener('touchend', tapHandler, { passive: false });
      
      // Guarda referências para limpeza
      handlers.push({ 
        element: ref.current, 
        tapHandler,
        touchStartHandler
      });
    };

    // Aplica os listeners aos inputs
    attachListeners(minRef, 'min');
    attachListeners(maxRef, 'max');

    // Capture os timers atuais para uso no cleanup (evita warning do linter sobre ref mutável)
    const capturedTimerMin = timerMin.current;
    const capturedTimerMax = timerMax.current;

    // Cleanup: remove todos os event listeners e limpa timers
    return () => {
      handlers.forEach(({ element, tapHandler, touchStartHandler }) => {
        element.removeEventListener('pointerup', tapHandler);
        element.removeEventListener('touchend', tapHandler);
        element.removeEventListener('touchstart', touchStartHandler);
      });

      if (capturedTimerMin) clearTimeout(capturedTimerMin);
      if (capturedTimerMax) clearTimeout(capturedTimerMax);
    };
  }, [minRef, maxRef, opts.doubleTapMs]); // Dependências do useEffect
}