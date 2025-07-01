import { normalize } from '../Utils/utils';

export const fetchBrazilianCities = async () => {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const ufs = await response.json();

    const allCities = [];
    for (const uf of ufs) {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.sigla}/municipios`);
        const cities = await response.json();
        cities.forEach(city => {
            allCities.push({
                display_name: `${city.nome}, ${uf.sigla}`,
                name: city.nome,
                state: uf.sigla
            });
        });
    }

    return allCities;
};

export const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

export const reverseGeocode = async (latitude, longitude) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    return await res.json();
};

export const findLocationInCache = (cache, city, state) => {
    return cache.find(loc =>
        normalize(loc.name) === normalize(city) &&
        normalize(loc.state) === normalize(state)
    );
};

export const States = [
    { code: 'AC', name: 'Acre' },
    { code: 'AL', name: 'Alagoas' },
    { code: 'AP', name: 'Amapá' },
    { code: 'AM', name: 'Amazonas' },
    { code: 'BA', name: 'Bahia' },
    { code: 'CE', name: 'Ceará' },
    { code: 'DF', name: 'Distrito Federal' },
    { code: 'ES', name: 'Espírito Santo' },
    { code: 'GO', name: 'Goiás' },
    { code: 'MA', name: 'Maranhão' },
    { code: 'MT', name: 'Mato Grosso' },
    { code: 'MS', name: 'Mato Grosso do Sul' },
    { code: 'MG', name: 'Minas Gerais' },
    { code: 'PA', name: 'Pará' },
    { code: 'PB', name: 'Paraíba' },
    { code: 'PR', name: 'Paraná' },
    { code: 'PE', name: 'Pernambuco' },
    { code: 'PI', name: 'Piauí' },
    { code: 'RJ', name: 'Rio de Janeiro' },
    { code: 'RN', name: 'Rio Grande do Norte' },
    { code: 'RS', name: 'Rio Grande do Sul' },
    { code: 'RO', name: 'Rondônia' },
    { code: 'RR', name: 'Roraima' },
    { code: 'SC', name: 'Santa Catarina' },
    { code: 'SP', name: 'São Paulo' },
    { code: 'SE', name: 'Sergipe' },
    { code: 'TO', name: 'Tocantins' },
    { code: 'default', name: 'Todos' },
];