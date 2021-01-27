/* eslint-disable react/prop-types */
import { Button } from '@material-ui/core';
import React from 'react';

// eslint-disable-next-line no-shadow
const ShowGermany = () => {
  // const [country, setCountry] = useState('');

  const handleAddCountry = () => {
    console.log('Germany');
    // setCountry('');
  };

  return <Button onClick={handleAddCountry}>Show Germany</Button>;
};

export default ShowGermany;
