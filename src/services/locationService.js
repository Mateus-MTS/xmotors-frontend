import { normalize } from '../utils/utils';
import { getDDDInfo } from '../data/ddd.Regions';

export const Regions = [
  { name: 'Sul', states: ['RS', 'SC', 'PR'] },
  { name: 'Sudeste', states: ['SP', 'RJ', 'MG', 'ES'] },
  { name: 'Centro-Oeste', states: ['GO', 'MT', 'MS', 'DF'] },
  { name: 'Norte', states: ['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC'] },
  { name: 'Nordeste', states: ['MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'] }
];

export const States = [
  { code: 'AC', name: 'Acre', region: 'Norte' },
  { code: 'AL', name: 'Alagoas', region: 'Nordeste' },
  { code: 'AP', name: 'Amapá', region: 'Norte' },
  { code: 'AM', name: 'Amazonas', region: 'Norte' },
  { code: 'BA', name: 'Bahia', region: 'Nordeste' },
  { code: 'CE', name: 'Ceará', region: 'Nordeste' },
  { code: 'DF', name: 'Distrito Federal', region: 'Centro-Oeste' },
  { code: 'ES', name: 'Espírito Santo', region: 'Sudeste' },
  { code: 'GO', name: 'Goiás', region: 'Centro-Oeste' },
  { code: 'MA', name: 'Maranhão', region: 'Nordeste' },
  { code: 'MT', name: 'Mato Grosso', region: 'Centro-Oeste' },
  { code: 'MS', name: 'Mato Grosso do Sul', region: 'Centro-Oeste' },
  { code: 'MG', name: 'Minas Gerais', region: 'Sudeste' },
  { code: 'PA', name: 'Pará', region: 'Norte' },
  { code: 'PB', name: 'Paraíba', region: 'Nordeste' },
  { code: 'PR', name: 'Paraná', region: 'Sul' },
  { code: 'PE', name: 'Pernambuco', region: 'Nordeste' },
  { code: 'PI', name: 'Piauí', region: 'Nordeste' },
  { code: 'RJ', name: 'Rio de Janeiro', region: 'Sudeste' },
  { code: 'RN', name: 'Rio Grande do Norte', region: 'Nordeste' },
  { code: 'RS', name: 'Rio Grande do Sul', region: 'Sul' },
  { code: 'RO', name: 'Rondônia', region: 'Norte' },
  { code: 'RR', name: 'Roraima', region: 'Norte' },
  { code: 'SC', name: 'Santa Catarina', region: 'Sul' },
  { code: 'SP', name: 'São Paulo', region: 'Sudeste' },
  { code: 'SE', name: 'Sergipe', region: 'Nordeste' },
  { code: 'TO', name: 'Tocantins', region: 'Norte' }
];

export const fetchBrazilianCities = async () => {
  const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  
  if (!response.ok) {
    throw new Error('Erro ao buscar estados');
  }
  
  const ufs = await response.json();
  const allCities = [];
  
  for (const uf of ufs) {
    const citiesResponse = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.sigla}/municipios`
    );
    
    if (!citiesResponse.ok) {
      console.error(`Erro ao buscar cidades de ${uf.sigla}`);
      continue;
    }
    
    const cities = await citiesResponse.json();
    
    cities.forEach(city => {
      allCities.push({
        id: city.id,
        name: city.nome,
        state: uf.sigla,
        stateFullName: uf.nome,
        display_name: `${city.nome}, ${uf.sigla}`,
        microrregion: city.microrregiao?.nome,
        mesorregion: city.mesorregiao?.nome
      });
    });
  }

  return allCities;
};

// ⭐ Busca cidades por DDD com informações de região
export const fetchCitiesByDDD = async (ddd) => {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/ddd/v1/${ddd}`);
    
    if (!response.ok) {
      throw new Error(`DDD ${ddd} não encontrado`);
    }
    
    const data = await response.json();
    const dddInfo = getDDDInfo(ddd);
    
    // Ordena cidades em ordem alfabética
    const sortedCities = [...data.cities].sort((a, b) => 
      a.localeCompare(b, 'pt-BR')
    );
    
    return {
      state: data.state,
      ddd: ddd,
      region: dddInfo?.region || 'Região',
      cities: sortedCities.map(cityName => ({
        name: cityName,
        state: data.state,
        ddd: ddd,
        region: dddInfo?.region || 'Região',
        display_name: cityName,
        display_subtitle: `DDD ${ddd} - ${dddInfo?.region || 'Região'}`,
        isDDD: true
      }))
    };
  } catch (error) {
    console.error(`Erro ao buscar DDD ${ddd}:`, error);
    return null;
  }
};

export const getCurrentLocation = async () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não suportada'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
      enableHighAccuracy: true
    });
  });
};

export const reverseGeocode = async (latitude, longitude) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
    {
      headers: {
        'User-Agent': 'VehicleApp/1.0'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error('Erro ao buscar endereço');
  }
  
  return await response.json();
};

export const findLocationInCache = (cache, city, state) => {
  if (!cache) return null;
  return cache.find(loc =>
    normalize(loc.name) === normalize(city) &&
    normalize(loc.state) === normalize(state)
  );
};