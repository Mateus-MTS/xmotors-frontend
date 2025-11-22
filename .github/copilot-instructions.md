## Resumo rápido

Este repositório é uma aplicação React (v19) criada com Vite. Principais pontos:
- Estrutura: `src/components` contém componentes React em `.jsx` e estilos SCSS em `src/assets/scss`.
- Estado/Fetch: usa @tanstack/react-query (config em `src/config/queryClient.js`) — muitos dados são fortemente cacheados (staleTime = 90 dias).
- Serviços centrais: `src/services` contém integrações com APIs externas, p.ex. `locationService.js` (IBGE, BrasilAPI, Nominatim).

## Comandos importantes
- Desenvolvimento: `npm run dev` (Vite + HMR)
- Build: `npm run build` (Vite)
- Preview: `npm run preview` (server estático do build)
- Lint: `npm run lint` (ESLint)

## Padrões e convenções do projeto
- Componentes em `src/components/*` usam extensão `.jsx`. Ex.: `src/components/App.jsx`.
- SCSS: os estilos estão em `src/assets/scss/` com partials por componente em `src/assets/scss/component/`. Existe um agregador `src/components/_index.scss` que usa (`@use`) os partials — ao criar um novo componente, adicione o partial e registre-o nesse index quando apropriado.
- Nome de arquivos SCSS: geralmente `_<nome>.scss` ou `Component.scss` dependendo da pasta. Veja `src/assets/scss/component/_header.scss` e `src/components/Footer/_footer.scss`.
- Exports de módulos: alguns módulos têm um `index.js` que reexporta o default (ex.: `src/components/Filter/GeoLocationInput/index.js`). Siga esse padrão para compartilhar componentes.

## Fluxos de dados e arquitetura
- React Query: globalmente inicializado em `src/config/queryClient.js`. Observação crítica: as queries possuem `staleTime` e `gcTime` longos para evitar refetchs frequentes; ao adicionar novas queries, escolha keys e invalidações conscientemente.
- Serviços: `src/services/locationService.js` centraliza lógica para buscar cidades (IBGE), DDDs (BrasilAPI) e reverse geocoding (Nominatim). Quando implementar features que dependem de localidades, prefira reutilizar essas funções.
- Providers: o app envolve a árvore de componentes com `QueryClientProvider` em `src/main.jsx`. React Query Devtools já está incluído para debugging.

## Integrações externas importantes
- IBGE APIs (v1 localidades): usado por `fetchBrazilianCities` — operações de larga escala e pode exigir tratamento de rate limit / timeouts.
- BrasilAPI DDD endpoint: usado em `fetchCitiesByDDD`.
- Nominatim (OpenStreetMap) para reverse geocoding: `reverseGeocode` já define um `User-Agent` — manter este header para evitar bloqueios.

## Exemplos de mudanças comuns e onde editar
- Adicionar um novo filtro de localização:
  - Atualize/consuma funções em `src/services/locationService.js` (ex.: `fetchCitiesByMesoregion`/`fetchCitiesByMicroregion`).
  - Atualize `src/components/Filter/FilterPanel/FilterPanel.jsx` para incluir UI e use React Query para buscar dados (siga keys existentes pelas convenções de cache).
  - Adicione partial SCSS em `src/assets/scss/component/` e importe em `src/components/_index.scss`.
- Modificar comportamento de cache ou refetch:
  - Altere `src/config/queryClient.js` (cuidado: valores atuais aumentam retenção de cache).

## Dicas para agentes de código (instruções práticas)
- Seja explícito ao alterar queries: devolva a key usada e explique se a cache deve ser invalidada. Ex.: "Adicionar useQuery(['cities', ddd], () => fetchCitiesByDDD(ddd)) com staleTime curto".
- Ao editar estilos, vincule o change ao arquivo SCSS parcial correspondente e atualize `src/components/_index.scss` se for um novo componente.
- Evite chamar APIs externas em testes ou em execução local sem mocks; prefira criar um mock em `src/__mocks__` ou usar fetch mocks.

## Pontos de atenção / armadilhas conhecidas
- O projeto é JS (não TypeScript) apesar de ter `@types/*` nas devDependencies. Não converta para TS sem alinhamento.
- React Query está configurado para não refazer requisições automaticamente (refetchOnWindowFocus: false, refetchOnMount: false) — mudanças no backend podem não ser refletidas até invalidação explícita.
- Operações massivas no `fetchBrazilianCities` podem ser lentas; a função já tenta agrupar chamadas, mas pode gerar muitos requests — considere jobs em background ou endpoints no backend para tarefas heavy.

## Onde procurar mais contexto
- Lógica de consulta/config: `src/config/queryClient.js`
- Serviços de localização: `src/services/locationService.js`
- Ponto de entrada e providers: `src/main.jsx`
- SCSS e organização de estilos: `src/assets/scss/` e `src/components/_index.scss`

Se alguma parte ficou pouco clara (por exemplo, intenção do cache de 90 dias ou política de CI/CD), diga qual file ou fluxo você quer que eu aborde com mais detalhe e eu ajusto o arquivo. 

## Política de cache (adicionada)

- Para dados que raramente mudam (nomes de cidades, estados, DDDs), não é necessário refazer requisições a cada montagem. Use cache com duração longa (ex.: staleTime = 90 dias) e defina uma estratégia de invalidação quando houver atualizações significativas (por exemplo: deploy com alteração de dados, webhook de fonte de dados, ou um job agendado que atualize o cache). Evite políticas que forcem refetch automático no foco da janela. Exemplos práticos:
  - Dados estáticos: staleTime alto (dias/meses) e gcTime maior (ex.: 180 dias).
  - Dados que mudam ocasionalmente: staleTime menor (horas/dias) e invalidação manual via key (queryClient.invalidateQueries(['cities'])).

## Templates de prompt úteis para agentes

Use estes templates para pedir alterações consistentes ao repositório. Prefira sempre fornecer o arquivo(s) alvo(s) e o comportamento esperado.

- Adicionar/alterar uma query com cache curto:

  "Edite `src/components/Filter/FilterPanel/FilterPanel.jsx`: adicione uma `useQuery(['cities', ddd], () => fetchCitiesByDDD(ddd))` usando `fetchCitiesByDDD` de `src/services/locationService.js`. Defina `staleTime: 1000 * 60 * 60` (1 hora) para essa query e explique por que escolheu essa duração. Atualize tests/mocks se aplicável."

- Implementar novo filtro por mesorregião:

  "Adicione UI no `FilterPanel` para filtrar por mesorregião. Use `fetchCitiesByMesoregion(mesoregionCode)` de `src/services/locationService.js`. Crie um partial SCSS em `src/assets/scss/component/_filter-mesoregion.scss` e registre em `src/components/_index.scss`." 

- Limpar vendor JS do lint (exemplo de commit):

  "Adicione `.eslintignore` para ignorar `public/assets/js/*` e reexecute `npm run lint`. Explique por que isso é seguro (arquivos vendor/minificados)."

Se quiser, posso gerar exemplos práticos adicionais (snippets de código) para cada template acima. 
