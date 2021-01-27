/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import { useContext } from 'react';
import { ApiContext } from 'contexts/api-context';

export const useGlobalCases = () => {
  const api = useContext(ApiContext);
  axios
    .get(
      'https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json'
    )
    .then((res) => {
      const { data } = res;
      api.setGlobalCases({ data });
    });
};
