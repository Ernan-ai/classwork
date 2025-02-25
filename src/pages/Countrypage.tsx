import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Импорт иконки стрелки
import DrawerReady from '../components/DrawerReady';
import './Countrypage.css';
interface Country {
  alpha3Code: string;
  name: string;
  capital: string;
  population: number;
  borders: string[];
}

const CountryPage: React.FC = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [borders, setBorders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCountryNames = async (codes: string[]) => {
    const names: string[] = [];
    for (let code of codes) {
      const response = await fetch(`https://restcountries.com/v2/alpha/${code}`);
      const data = await response.json();
      names.push(data.name);
    }
    return names;
  };

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      const response = await fetch(`https://restcountries.com/v2/alpha/${countryCode}`);
      const data = await response.json();
      setCountry(data);
      if (data.borders && data.borders.length > 0) {
        const borderNames = await fetchCountryNames(data.borders);
        setBorders(borderNames);
      }
      setLoading(false);
    };

    if (countryCode) {
      fetchCountry();
    }
  }, [countryCode]);

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <>
      <DrawerReady />
      <div className="back-container">
      </div>
      <div className="container">
        <Link to="/">
        <button className="back-button">
          <FaArrowLeft size={20} />
          <span>Домой</span>
        </button>
        </Link>
        <h1 className="title">{country?.name}</h1>
        <div className="info">
          <img src={country?.flag} alt="" width={'300px'} />
          <p>Capital: {country?.capital}</p>
          <p>Population: {country?.population}</p>
          <p>Borders with с: {borders.length > 0 ? borders.join(', ') : 'Нет соседей'}.</p>
        </div>
      </div>
    </>
  );
};

export default CountryPage;
