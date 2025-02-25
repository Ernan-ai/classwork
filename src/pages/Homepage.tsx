import React from 'react';
import DrawerReady from '../components/DrawerReady'

interface Country {
    alpha3Code: string;
    name: string;
  }
  

const CountryPage: React.FC = () => {
  return (
    <div>
      <DrawerReady></DrawerReady>
      <div>
        HOMe
      </div>
    </div>
  );
};
git push -u origin main
export default CountryPage;
