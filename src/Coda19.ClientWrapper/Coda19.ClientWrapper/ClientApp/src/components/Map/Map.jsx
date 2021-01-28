// /* eslint-disable react/prop-types */
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';

// import KeplerGl from 'kepler.gl';
// import { addDataToMap } from 'kepler.gl/actions';
// // import json2mq from 'json2mq';
// import axios from 'axios';
// // import { useMediaQuery } from '@material-ui/core';
// // import ShowGermany from './ShowGermany';

// import MapConfig from './config.json';
// // import GermanyData from './germany.json';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const Map = () => {
//   const dispatch = useDispatch();
//   const [globalConfirmedCases, setGlobalConfirmedCases] = useState();
//   // const xs = useMediaQuery(
//   //   json2mq({
//   //     minWidth: 600,
//   //     maxWidth: 700,
//   //   })
//   // );
//   // const sm = useMediaQuery(
//   //   json2mq({
//   //     minWidth: 701,
//   //     maxWidth: 850,
//   //   })
//   // );

//   // const getMapHeight = () => {
//   //   if (xs) {
//   //     return 300;
//   //   }
//   //   if (sm) {
//   //     return 400;
//   //   }
//   //   return 500;
//   // };

//   const [covidData, setCovidData] = useState({});

//   // const handleChange = () => {
//   //   setCovidData(GermanyData);
//   // };

//   useEffect(() => {
//     if (globalConfirmedCases) {
//       setCovidData(globalConfirmedCases.data);
//     }
//   }, [globalConfirmedCases]);

//   useEffect(() => {
//     axios
//       .get(
//         'https://gist.githubusercontent.com/leighhalliday/a994915d8050e90d413515e97babd3b3/raw/a3eaaadcc784168e3845a98931780bd60afb362f/covid19.json'
//       )
//       .then((res) => {
//         const { data } = res;
//         setGlobalConfirmedCases({ data });
//       });
//   }, []);

//   useEffect(() => {
//     if (covidData) {
//       dispatch(
//         addDataToMap({
//           datasets: {
//             info: {
//               label: 'COVID-19',
//               id: 'covid19',
//             },
//             data: covidData,
//           },
//           options: { centerMap: true, readOnly: false },
//           config: MapConfig,
//         })
//       );
//     }
//   }, [dispatch, covidData]);

//   return (
//     <>
//       <KeplerGl
//         id="covid"
//         mapboxApiAccessToken="pk.eyJ1IjoibmF6bnV0IiwiYSI6ImNra2EyZ2w0ZzAwYWcydXFqZXIwYjdpOXQifQ.zQL3fDKPw313GaylmL-VCQ"
//         width={720}
//         height={500}
//       />
//       {/* <ShowGermany /> */}
//     </>
//   );
// };

// export default Map;
