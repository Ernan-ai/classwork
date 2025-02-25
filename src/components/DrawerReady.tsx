
import { useState, useEffect } from 'react';
import DrawerR from './drawer'; 

interface Country {
  alpha3Code: string;
  name: string; 
}

const DrawerReady = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  const fetchData = async <T>(url: string): Promise<T> => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Ошибка при запросе: ${response.statusText}`);
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      setError('Не удалось получить данные');
      throw new Error(`Не удалось получить данные: ${error}`);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData<Country[]>('https://restcountries.com/v2/all?fields=alpha3Code,name');
        setCountries(data);
      } catch (error) {
        setError('Не удалось загрузить данные');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <DrawerR items={['<div>Загрузка...</div>']} />; 
  if (error) return <DrawerR items={['<div>{error}</div>']} />;


  return (
    <div>
      {countries && countries.length > 0 ? (
        <DrawerR items={countries} />
      ) : (
        <div>Нет доступных данных</div>
      )}
    </div>
  );
};

export default DrawerReady;
